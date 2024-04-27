<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Principals\PrincipalsUtil;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountsController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    function index()
    {
        $currentUserID = auth()->user()->id;
        $users = DB::table('users')
            ->where('id','<>',$currentUserID)
            ->get();

        // mvc = main_vendor_code (LMAO)
        $result = $users->map(function($user) {
            $mvcs = json_decode($user->main_vendor_codes);
            $principals = [];
            if($mvcs != null) {
                if($mvcs[0]== '*') {
                    $principals[] = [
                        'vendor_name' => 'All Principals',
                        'vendor_code' => '',
                        'main_vendor_code' => '',
                    ];
                } else {
                    foreach($mvcs as $mvc) {
                        $vendors = DB::table(PrincipalsUtil::$TBL_PRINCIPALS)
                            ->where('main_vendor_code', $mvc)
                            ->get();
                        foreach($vendors as $v) {
                            $principals[] = [
                                'vendor_name' => $v->name,
                                'vendor_code' => $v->vendor_code,
                                'main_vendor_code' => $mvc,
                            ];
                        }
                    }
                }
            }

            $user->principals = $principals;
            return $user;
        });

        return response()->json($result);
    }


    function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', 'min:2',],
            'username' => ['required', 'string', 'max:255', 'min:3', 'unique:users'],
            'email' => ['max:255', 'unique:users', 'email'],
            'password' => ['required', 'string', 'min:3'],
            'user_type' => ['required', 'string', 'max:255'],
            // 'main_vendor_codes' => ['required'],
        ]);

        if ($validator->fails()) {
            $invalidations = [
                'invalidations' => $validator->getMessageBag()->toArray()
            ];
            return response()->json($invalidations);
        } else {
            try {
                $arr = [
                    'name' => $request->name,
                    'username' => $request->username,
                    'password' => Hash::make($request->password),
                    'email' => $request->email ?? null,
                    'user_type' => $request->user_type,
                ];

                $main_vendor_codes = json_encode($request->main_vendor_codes);
                if($main_vendor_codes != 'null') {
                    $arr['main_vendor_codes'] = $main_vendor_codes;
                }

                $result = DB::table('users')
                    ->insert($arr);
                return response()->json($result);
            } catch (QueryException $e) {
                //throw $th;
                return response()->json($e);
            }
        }
    }


    function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255', 'min:2',],
            'username' => ['required', 'string', 'max:255', 'min:3', "unique:users,username,$request->id"],
            'email' => ['max:255', 'unique:users'],
            'user_type' => ['required', 'string', 'max:255'],
        ]);

        if ($validator->fails()) {
            $invalidations = [
                'invalidations' => $validator->getMessageBag()->toArray()
            ];
            return response()->json($invalidations);
        } else {
            try {
                $result = DB::table('users')
                    ->where('id', $request->id)
                    ->update([
                        'name' => $request->name,
                        'username' => $request->username,
                        'email' => $request->email ?? null,
                        'user_type' => $request->user_type,
                    ]);
                return response()->json($result);
            } catch (QueryException $e) {
                //throw $th;
                return response()->json($e);
            }
        }
    }


    function updatePassword(Request $request)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'password' => 'required|confirmed|min:3',
            'old_password' => ['required', function ($attribute, $value, $fail) use ($request) {
                $old_password_hashed = DB::table('users')->where('id', $request->id)
                    ->first()->password;
                if (!Hash::check($request->old_password, $old_password_hashed)) {
                    return $fail(__('The old password is incorrect.'));
                }
            }],
        ]);

        if ($validator->fails()) {
            $invalidations = [
                'invalidations' => $validator->getMessageBag()->toArray()
            ];
            return response()->json($invalidations);
        } else {
            try {
                $result = DB::table('users')
                    ->where('id', $request->id)
                    ->update([
                        'password' => Hash::make($request->password),
                    ]);
                return response()->json($result);
            } catch (QueryException $e) {
                //throw $th;
                return response()->json($e);
            }
        }
    }

    function updatePrincipalAssignment(Request $request)
    {
        $main_vendor_codes = json_encode($request->main_vendor_codes);
        $main_vendor_codes = $main_vendor_codes == '[]' ? NULL : $main_vendor_codes;

        // dd($request);
        $validator = Validator::make($request->all(), [
            // 'main_vendor_codes' => 'required',
        ]);

        if ($validator->fails()) {
            $invalidations = [
                'invalidations' => $validator->getMessageBag()->toArray()
            ];
            return response()->json($invalidations);
        } else {
            try {
                $result = DB::table('users')
                    ->where('id', $request->id)
                    ->update([
                        'main_vendor_codes' => $main_vendor_codes,
                    ]);
                return response()->json($result);
            } catch (QueryException $e) {
                //throw $th;
                return response()->json($e);
            }
        }
    }


    function delete(Request $request)
    {
        try {
            $res = DB::table('users')
                ->where('id', $request->id)
                ->delete();
            return response()->json($res);
        } catch (QueryException $e) {
            //throw $th;
            return response()->json($e);
        }
    }
}
