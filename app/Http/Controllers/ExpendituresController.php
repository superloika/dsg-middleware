<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExpendituresController extends Controller
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

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $user_id = auth()->user()->id;
        $limit = intval($request->input('limit'));
        $limit = ($limit < 1) ? 10 : $limit;
        $dateExpenseFrom = $request->input('dateExpenseFrom');
        $dateExpenseTo = $request->input('dateExpenseTo');
        $searchKeyParticulars = $request->input('searchKeyParticulars');

        $expenses = DB::table('expenses')->where('user_id',$user_id);

        if($searchKeyParticulars !== null) {
            $expenses = $expenses->where('particular','LIKE', "%$searchKeyParticulars%");
        }
        if($dateExpenseFrom !== null && $dateExpenseTo !== null) {
            $expenses = $expenses->whereBetween('expense_date', [$dateExpenseFrom, $dateExpenseTo]);
        }

        // $expenses = $expenses->orderBy('expense_id', 'DESC')->paginate($limit);
        $expenses = $expenses->orderBy('expense_id', 'DESC')->paginate(9999999);

        return response()->json($expenses);
    }


    public function store(Request $request)
    {
        $user_id = auth()->user()->id;
        $expense_id = $request->expense_id;

        if($expense_id == null) {
            $result = DB::table('expenses')
                ->insert(['expense_id'=> $request->expense_id,
                    'particular'=>$request->particular,
                    'amount' => $request->amount,
                    'quantity' => $request->quantity,
                    'user_id' => $user_id,
                    'expense_date' => $request->expense_date,
                    'tag_ids' => json_encode($request->tag_ids),
                ]);
            return response()->json($result);
        } else {
            $result = DB::table('expenses')
            ->where('expense_id', $request->expense_id)
            ->update(['particular'=>$request->particular,
                'amount' => $request->amount,
                'quantity' => $request->quantity,
                'user_id' => $user_id,
                'expense_date' => $request->expense_date,
                'tag_ids' => json_encode($request->tag_ids),
            ]);
            return response()->json($result);
        }
    }


    public function delete($expense_id)
    {
        $result = DB::table('expenses')
            ->where('expense_id', $expense_id)
            ->delete();
        return response()->json($result);
    }

    public function particulars()
    {
        $particulars = DB::table('expenses')
            ->select(['particular'])
            ->distinct()
            ->get();
        return response()->json($particulars);
    }

    public function firstEntryDate()
    {
        $firstDate = DB::table('expenses')
            ->selectRaw('MIN(expense_date) as firstDate')
            ->get();
        return response()->json($firstDate);
    }

    public function expensesTags()
    {
        $expensesTags = DB::table('expenses_tags')->get();
        return response()->json($expensesTags);
    }
}
