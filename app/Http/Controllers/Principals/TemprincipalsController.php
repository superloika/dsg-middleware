<?php

namespace App\Http\Controllers\Principals;

use App\Events\GenerateTemplated;
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

            // $template_variation_count = 1;

            $res['success'] = true;
            $res['message'] = 'Success';
            $res['line_count'] = 0;
            // $res['output_template_variations'] = [];
            $res['output_template_variations'] = [
                [
                    'name' => 'Sales Invoices',
                    'output_template' => [],
                ],
                [
                    'name' => 'Returns',
                    'output_template' => [],
                ],
            ];

            $dateToday = Carbon::now();
            $system_date = $dateToday->format('m/d/Y');
            $settings = PrincipalsUtil::getSettings($this->PRINCIPAL_CODE);
            // ***************************************************************************

            // ************************* MISC INITS **************************************
            $filesTotalLineCount = 0;
            $chunk_line_count = intval($settings['chunk_line_count'] ?? 0);
            $breakFilesIteration = false;
            // ************************* /MISC INITS *************************************

            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if(1) {
                // **************************** TEMPLATE 1 ****************************
                if(1) {
                    $pageLineCount = 1;
                    $pageNum = 1;

                    // **************** PENDING INVOICES ****************************************
                    // dd($request->posting_date_range);
                    $pendingInvoices = InvoicesController::getPendingInvoices(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $pendingInvoicesCount = $pendingInvoices->count();
                    $res['line_count'] += $pendingInvoicesCount;
                    // **************** /PENDING INVOICES ***************************************

                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($pendingInvoices as $pendingInvoice) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $pendingInvoicesCount) * 100);
                        GenerateTemplated::dispatch("Generating sales invoices ($progressPercent%)");

                        $doc_no = $pendingInvoice->doc_no;
                        $customer_code = $pendingInvoice->customer_code;
                        $posting_date = $pendingInvoice->posting_date;
                        // $posting_date = (new Carbon($posting_date))->format('m/d/Y';
                        $posting_date = (new Carbon($posting_date))->format('m/d/Y');
                        $item_code = $pendingInvoice->item_code;
                        $quantity = intval($pendingInvoice->quantity);
                        $price = doubleval($pendingInvoice->price);
                        $amount = doubleval($pendingInvoice->amount);
                        $uom = $pendingInvoice->uom;
                        $item_description = $pendingInvoice->item_description;
                        $sm_code = $pendingInvoice->sm_code;
                        $group_code = $pendingInvoice->group;

                        //********************************************************************
                        $nav_customer_name = $pendingInvoice->customer_name;
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

                        // if ($sm_code == null || $sm_code == '') {
                        //     $salesman_notfound = 1;
                        // }

                        $item_code_supplier = $item_code ?? 'NA';
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
                            'quantity' => $quantity,
                            // 'bulk_qty' => $bulk_qty,
                            // 'loose_qty' => $loose_qty,
                            'price' => $price,
                            'amount' => $amount,
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
                                !isset($res['output_template_variations'][0]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][0]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][0]['output_template']["Page " . $pageNum],
                                $arrGenerated
                            );

                            $pageLineCount += 1;
                            if ($pageLineCount > $chunk_line_count) {
                                $pageNum += 1;
                                $pageLineCount = 1;
                            }
                        } else {
                            // group output_template_variations
                            // if($salesman_notfound==1) {
                            //     if (
                            //         !isset($res['output_template_variations'][0]['output_template']['NO_SM_CODE'])
                            //     ) {
                            //         $res['output_template_variations'][0]['output_template']['NO_SM_CODE'] = [];
                            //     }
                            //     array_push(
                            //         $res['output_template_variations'][0]['output_template']['NO_SM_CODE'],
                            //         $arrGenerated
                            //     );
                            // } else {
                                if (
                                    !isset($res['output_template_variations'][0]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations'][0]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][0]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                            // }

                        }
                        // }
                    }
                }
                // **************************** /TEMPLATE 1 ****************************

                // **************************** TEMPLATE 2 ****************************
                if(2) {
                    $pageLineCount = 1;
                    $pageNum = 1;

                    // **************** RETURNS ************************************************
                    $returns = InvoicesController::getReturns(
                        $request->principal_code, $request->posting_date_range, $request->status
                    );
                    $returnsCount = $returns->count();
                    // dd($returns[0]);
                    $res['line_count'] += $returnsCount;
                    // **************** /RETURNS ************************************************

                    // Loop through each line of the file content
                    $loopCounter = 0;
                    foreach ($returns as $return) {
                        $loopCounter++;
                        $progressPercent = round(($loopCounter / $returnsCount) * 100);
                        GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                        $doc_no = $return->doc_no;
                        $customer_code = $return->customer_code;
                        $posting_date = $return->shipment_date;
                        // $posting_date = (new Carbon($posting_date))->format('m/d/Y';
                        $posting_date = (new Carbon($posting_date))->format('m/d/Y');
                        $item_code = $return->item_code;
                        $quantity = intval($return->quantity);
                        $price = doubleval($return->price);
                        $amount = doubleval($return->amount);
                        $uom = $return->uom;
                        $item_description = $return->item_description;
                        $sm_code = $return->sm_code;
                        $group_code = $return->group;
                        $invoice_doc_no = $return->invoice_doc_no; // reference #
                        $status = $return->status;

                        //********************************************************************
                        $nav_customer_name = $return->customer_name;
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

                        // if ($sm_code == null || $sm_code == '') {
                        //     $salesman_notfound = 1;
                        // }

                        $item_code_supplier = $item_code ?? 'NA';
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
                            'quantity' => $quantity,
                            // 'bulk_qty' => $bulk_qty,
                            // 'loose_qty' => $loose_qty,
                            'price' => $price,
                            'amount' => $amount,
                            'uom' => $uom,
                            'item_description' => $item_description,
                            'description_supplier' => $item_description ?? 'NA',
                            // 'customer_name' => $nav_customer_name,
                            'customer_name' => $nav_customer_name ?? 'NA',
                            'sm_code' => $sm_code ?? 'NA',
                            'system_date' => $system_date,
                            'group' => $group_code,
                            'invoice_doc_no' => $invoice_doc_no,
                            'status' => $status
                        ];

                        if ($chunk_line_count > 0) {
                            if (
                                !isset($res['output_template_variations'][1]['output_template']["Page " . $pageNum])
                            ) {
                                $res['output_template_variations'][1]['output_template']["Page " . $pageNum] = [];
                            }
                            array_push(
                                $res['output_template_variations'][1]['output_template']["Page " . $pageNum],
                                $arrGenerated
                            );

                            $pageLineCount += 1;
                            if ($pageLineCount > $chunk_line_count) {
                                $pageNum += 1;
                                $pageLineCount = 1;
                            }
                        } else {
                            // group output_template_variations
                            // if($salesman_notfound==1) {
                            //     if (
                            //         !isset($res['output_template_variations'][1]['output_template']['NO_SM_CODE'])
                            //     ) {
                            //         $res['output_template_variations'][1]['output_template']['NO_SM_CODE'] = [];
                            //     }
                            //     array_push(
                            //         $res['output_template_variations'][1]['output_template']['NO_SM_CODE'],
                            //         $arrGenerated
                            //     );
                            // } else {
                                if (
                                    !isset($res['output_template_variations'][1]['output_template'][$$group_by])
                                ) {
                                    $res['output_template_variations'][1]['output_template'][$$group_by] = [];
                                }
                                array_push(
                                    $res['output_template_variations'][1]['output_template'][$$group_by],
                                    $arrGenerated
                                );
                            // }

                        }
                        // }
                    }
                }
                // **************************** /TEMPLATE 2 ****************************

                // // ***************************** TEMPLATE 2 *****************************
                // if(2) {
                //     $pageLineCount = 1;
                //     $pageNum = 1;

                //     // **************** RETURNS ************************************************
                //     $returns = InvoicesController::getReturns(
                //         $request->principal_code, $request->posting_date_range, $request->status
                //     );
                //     $returnsCount = $returns->count();
                //     // dd($returns[0]);
                //     $res['line_count'] += $returnsCount;
                //     // **************** /RETURNS ************************************************

                //     // Loop through each line of the file content
                //     $loopCounter = 0;
                //     foreach ($returns as $return) {
                //         $loopCounter++;
                //         $progressPercent = round(($loopCounter / $returnsCount) * 100);
                //         GenerateTemplated::dispatch("Generating returns ($progressPercent%)");

                //         $doc_no =               $return->doc_no;
                //         $customer_code =        $return->customer_code;
                //         $shipment_date =        $return->shipment_date;
                //         $posting_date =         (new Carbon($shipment_date))->format('m/d/Y');
                //         $item_code =            $return->item_code . '';
                //         $quantity =             intval($return->quantity);
                //         $price =                doubleval($return->price);
                //         $amount =               doubleval($return->amount);
                //         $uom =                  $return->uom;
                //         $item_description =     $return->item_description;
                //         $group_code =           $return->group;
                //         $discount_percentage =  $return->discount_percentage ?? 0;
                //         $discount_percentage =  intval($discount_percentage);
                //         $invoice_quantity =     intval($return->invoice_quantity);
                //         $invoice_doc_no =       $return->invoice_doc_no;
                //         $return_indicator =     $return->return_indicator;
                //         $vendor_code =          $return->vendor_code;
                //         $sm_code =              $return->sm_code;
                //         $remarks =              $return->remarks;
                //         $discount_amount =      $amount * $discount_percentage / 100;
                //         $nav_customer_name =    $return->customer_name;

                //         /**
                //          * return quantity vs actual sales invoice quantity
                //          * skip returned items with greater quantity than the actual sales quantity
                //          */
                //         // if($quantity > $invoice_quantity) continue;

                //         //********************************************************************
                //         // $customer = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_CUSTOMERS)
                //         //     ->where('principal_code', $this->PRINCIPAL_CODE)
                //         //     ->where('customer_code', $customer_code)
                //         //     ->first();
                //         // $item = DB::table(PrincipalsUtil::$TBL_PRINCIPALS_ITEMS)
                //         //     ->where('principal_code', $this->PRINCIPAL_CODE)
                //         //     ->where('item_code', $item_code)
                //         //     ->first();

                //         // // price and uom mapping (supplier) ********************
                //         // $uom_supplier = $return->qty_per_uom > 1 ?
                //         //     $item->uom : $item->conversion_uom;
                //         // $price_supplier = $return->qty_per_uom > 1 ?
                //         //     ($item->uom_price ?? 0) : ($item->conversion_uom_price ?? 0);
                //         // $price_supplier = doubleval($price_supplier);
                //         // $amount_supplier = round($price_supplier * $quantity, 4);

                //         // ************************* MISC INITS **************************
                //         $item_notfound = 0;
                //         $customer_notfound = 0;
                //         $salesman_notfound = 0;
                //         $missing_customer_name = '';
                //         $missing_item_name = '';
                //         // $item_code_supplier = 'NA';
                //         // $item_description_supplier = 'NA';
                //         // $customer_code_supplier = 'NA';
                //         // $uom_supplier = 'NA';
                //         // $price_supplier = 0;
                //         // $amount_supplier = 0;

                //         // check item *******************************
                //         // code here...

                //         // check customer ***************************
                //         // code here...

                //         // ************************* /MISC INITS **************************
                //         // Generated data line structure
                //         $arrGenerated = [
                //             //commons
                //             'customer_code' =>          $customer_code,
                //             'alturas_customer_code' =>  $customer_code,
                //             'item_code' =>              $item_code,
                //             'alturas_item_code' =>      $item_code,
                //             'doc_no' =>                 $doc_no,
                //             'missing_customer_name' =>  $missing_customer_name,
                //             'missing_item_name' =>      $missing_item_name,
                //             'customer_notfound' =>      $customer_notfound,
                //             'item_notfound' =>          $item_notfound,
                //             'salesman_notfound' =>      $salesman_notfound,
                //             // principal specific
                //             'invoice_no' =>             $doc_no,
                //             'invoice_date' =>           $posting_date,
                //             'quantity' =>               $quantity,
                //             'price' =>                  $price,
                //             'price_supplier' =>         $price ?? 0,
                //             'amount' =>                 $amount,
                //             'amount_supplier' =>        $amount ?? 0,
                //             'uom' =>                    $uom,
                //             'uom_supplier' =>           $uom ?? 'NA',
                //             'item_description' =>       $item_description,
                //             'description_supplier' =>   $item_description,
                //             'customer_name' =>          $nav_customer_name,
                //             'system_date' =>            $system_date,
                //             'group' =>                  $group_code,
                //             'status' =>                 $return->status,
                //             // other BR payload props
                //             // 'cf_dsp_name_id' =>                     $br_config->cf_dsp_name,
                //             // 'cf_dsp_name_value' =>                  $settings['DSP_'. $group_code],
                //             // 'cf_return_indicator_id' =>             $br_config->cf_return_indicator,
                //             // 'cf_return_indicator_value' =>          $return_indicator,
                //             // 'cf_return_invoice_reference_id' =>     $br_config->cf_return_invoice_reference,
                //             // 'cf_return_invoice_reference_value' =>  $invoice_doc_no,
                //             'invoice_number' =>         $doc_no,
                //             'discount_percentage' =>    $discount_percentage,
                //             'discount_amount' =>        $discount_amount,
                //             'remarks' =>                $remarks,
                //             // order orig details
                //             'invoice_quantity' =>       $invoice_quantity,
                //             'invoice_doc_no' =>         $invoice_doc_no,
                //             'return_indicator' =>       $return_indicator,
                //             'vendor_code' =>            $vendor_code,
                //             'sm_code' =>                $sm_code,
                //         ];

                //         if ($chunk_line_count > 0) {
                //             if (
                //                 !isset(
                //                     $res[
                //                         'output_template_variations'
                //                     ][1]['output_template']["Page " . $pageNum]
                //                 )
                //             ) {
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template']["Page " . $pageNum] = [];
                //             }
                //             array_push(
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template']["Page " . $pageNum],
                //                 $arrGenerated
                //             );

                //             $pageLineCount += 1;
                //             if ($pageLineCount > $chunk_line_count) {
                //                 $pageNum += 1;
                //                 $pageLineCount = 1;
                //             }
                //         } else {
                //             // group output_template_variations
                //             if (
                //                 !isset(
                //                     $res[
                //                         'output_template_variations'
                //                     ][1]['output_template'][$$group_by]
                //                 )
                //             ) {
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template'][$$group_by] = [];
                //             }
                //             array_push(
                //                 $res[
                //                     'output_template_variations'
                //                 ][1]['output_template'][$$group_by],
                //                 $arrGenerated
                //             );
                //         }
                //     } // /loop invoices
                // }
                // // ***************************** /TEMPLATE 2 *****************************
            }
            // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX /TEMPLATE(S) XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

            // $fileCount++;

            return response()->json($res);

        } catch (\Throwable $th) {
            $res['success'] = false;
            $res['message'] = $th->getMessage();
            return response()->json($res, 500);
        }
    }

}
