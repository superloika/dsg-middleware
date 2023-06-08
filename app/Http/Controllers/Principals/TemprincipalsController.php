<?php

namespace App\Http\Controllers\Principals;

use App\Http\Controllers\Controller;
use App\Http\Controllers\InvoicesController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class TemprincipalsController extends Controller
{
    private $PRINCIPAL_CODE = 'temprincipals';

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
     * Generate templated data based on invoices with 'pending' status
     */
    public function generateTemplatedData(Request $request)
    {
        set_time_limit(0);

        try {
            // templated data grouped result filter
            $group_by = $request->group_by;
            if($group_by==null || $group_by=='null' || $group_by=='' || $group_by=='undefined') {
                $group_by = 'system_date';
            }

            $template_variation_count = 1;

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            $res['output_template_variations'] = [];

            $dateToday = Carbon::now();
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;
            // ************************* /MISC INITS *************************************

            // **************** PENDING INVOICES **************************
            // dd($request->posting_date_range);
            $pendingInvoices = InvoicesController::getPendingInvoices(
                $request->principal_code, $request->posting_date_range, $request->status
            );

            $res['line_count'] = $pendingInvoices->count();
            // **************** /PENDING INVOICES **************************

            // **************************** TEMPLATE(S) ****************************
            $pageLineCount = 1;
            $pageNum = 1;

            for ($tvc_index = 0; $tvc_index < $template_variation_count; $tvc_index++) {
                array_push($res['output_template_variations'], [
                    'name' => 'Template ' . ($tvc_index + 1),
                    'output_template' => [],
                ]);

                // Loop through each line of the file content
                foreach ($pendingInvoices as $pendingInvoice) {
                    $doc_no = trim($pendingInvoice->doc_no);
                    $customer_code = trim($pendingInvoice->customer_code);
                    $posting_date = trim($pendingInvoice->posting_date);
                    $posting_date = (new Carbon($posting_date))->format('d/m/Y');
                    $item_code = trim($pendingInvoice->item_code);
                    $quantity = trim($pendingInvoice->quantity);
                    $price = trim($pendingInvoice->price);
                    $amount = trim($pendingInvoice->amount);
                    $uom = trim($pendingInvoice->uom);
                    $item_description = trim($pendingInvoice->item_description);
                    $sm_code = trim($pendingInvoice->sm_code);
                    $group_code = trim($pendingInvoice->group);

                    //********************************************************************
                    $nav_customer_name = trim($pendingInvoice->customer_name);
                    if($nav_customer_name==null || $nav_customer_name=='') {
                        $nav_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                            ->where('customer_code', $customer_code)
                            ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                    }

                    // $nav_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                    //     ->where('item_code', $item_code)
                    //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;

                    // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                    //     ->where('principal_code', $this->PRINCIPAL_CODE)
                    //     ->where('customer_code', $customer_code)
                    //     ->first();

                    // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                    //     ->where('principal_code', $this->PRINCIPAL_CODE)
                    //     ->where('item_code', $item_code)
                    //     ->first();
                    // $salesman = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_SALESMEN)
                    //     ->where('principal_code', $this->PRINCIPAL_CODE)
                    //     ->where('group_code', $group_code)
                    //     ->first();
                    //********************************************************************

                    // quantity_conversion
                    // $bulk_qty = 0;
                    // $loose_qty = 0;
                    // if($item != null) {
                    //     $quo = $quantity/$item->conversion_qty;
                    //     $mod = $quantity%$item->conversion_qty;
                    //     $bulk_qty = intval($quo);
                    //     $loose_qty = $mod;
                    // }

                    // ******************** TEMPLATE 1 **************************
                    if ($tvc_index == 0) {
                        // ************************* MISC INITS **************************
                        $item_notfound = 0;
                        $customer_notfound = 0;
                        $salesman_notfound = 0;
                        $missing_customer_name = '';
                        $missing_item_name = '';

                        // if ($item == null) {
                        //     $item_notfound = 1;
                        //     // $missing_item_name = DB::table(PrincipalsUtil::$TBL_GENERAL_ITEMS)
                        //     //     ->where('item_code', $item_code)
                        //     //     ->first()->description ?? PrincipalsUtil::$ITEM_NOT_FOUND;
                        //     $missing_item_name = $item_description;
                        // } else {
                        // }

                        // if ($customer == null) {
                        //     $customer_notfound = 1;
                        //     $missing_customer_name = DB::table(PrincipalsUtil::$TBL_GENERAL_CUSTOMERS)
                        //         ->where('customer_code', $customer_code)
                        //         ->first()->name ?? PrincipalsUtil::$CUSTOMER_NOT_FOUND;
                        // } else {
                        // }

                        if ($sm_code == null || $sm_code == '') {
                            $salesman_notfound = 1;
                        }

                        $system_date = $dateToday->format('Y/m/d');

                        $item_code_supplier =$item_code ?? 'NA';
                        $customer_code_supplier = $customer_code ?? 'NA';
                        // ************************* /MISC INITS **************************

                        // Generated data line structure
                        $arrGenerated = [
                            //commons
                            'customer_code' => $customer_code_supplier,
                            'alturas_customer_code' => $customer_code,
                            'item_code' => $item_code_supplier,
                            'alturas_item_code' => $item_code,
                            'doc_no' => $doc_no,
                            'missing_customer_name' => $missing_customer_name,
                            'missing_item_name' => $missing_item_name,
                            'customer_notfound' => $customer_notfound,
                            'item_notfound' => $item_notfound,
                            'salesman_notfound' => $salesman_notfound,
                            // principal specific
                            'invoice_no' => $doc_no,
                            'invoice_date' => $posting_date,
                            'quantity' => intval($quantity),
                            // 'bulk_qty' => $bulk_qty,
                            // 'loose_qty' => $loose_qty,
                            'price' => doubleval($price),
                            'amount' => doubleval($amount),
                            'uom' => $uom,
                            'item_description' => $item_description,
                            'description_supplier' => $item_description ?? 'NA',
                            // 'customer_name' => $nav_customer_name,
                            'customer_name' => $nav_customer_name ?? 'NA',
                            'sm_code' => $sm_code ?? 'NA',
                            'system_date' => $system_date,
                            'group' => $pendingInvoice->group,
                            'status' => $pendingInvoice->status
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][$tvc_index]['output_template']["Page " . $pageNum],
                                $arrGenerated
                            );

                            $pageLineCount += 1;
                            if ($pageLineCount > $chunk_line_count) {
                                $pageNum += 1;
                                $pageLineCount = 1;
                            }
                        } else {
                            // group output_template_variations
                            if($salesman_notfound==1) {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'])
                                ) {
                                    $res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][$tvc_index]['output_template']['NO_SM_CODE'],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            } else {
                                // ---------------------------------------------------------------------------
                                if (
                                    !isset($res['output_template_variations'][$tvc_index]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations'][$tvc_index]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][$tvc_index]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                                // ---------------------------------------------------------------------------
                            }

                        }

                    }
                }

                // reset this guys to 1
                $pageLineCount = 1;
                $pageNum = 1;
            }
            // ********************************** /TEMPLATES **********************************

            // $fileCount++;

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

}
