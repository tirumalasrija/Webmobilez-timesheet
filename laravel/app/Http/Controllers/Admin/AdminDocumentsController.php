<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheetDocuments;
use Carbon\Carbon;
use Auth;
use App\TimeSheet;
use Illuminate\Support\Facades\DB;
class myObject
{
    public $documentId;
    public $dateOfWeek;
    public $name;
    public $doucmentName;
    public $startWeek;
    public $endWeek;
}
class AdminDocumentsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $duplicateIds = DB::table("timesheetdocuments")
        ->selectRaw("min(documentId) as documentId")
        ->groupBy("dateOfWeek", "userId")
        ->havingRaw('count(documentId) > ?', [1])
        ->pluck("documentId");

        $timesheet = TimeSheetDocuments::with('user_details')
        ->whereNotIn("documentId", $duplicateIds)
        ->orderBy('dateOfWeek', 'DESC')
      //  ->groupBy('dateOfWeek', 'userId')
        ->get();


        $MyObjects = array();

        foreach($timesheet as $value)
        {
            $MyObject = new myObject;
            $MyObject->documentId =$value->documentId;
            $MyObject->dateOfWeek =$value->dateOfWeek;
            $MyObject->name=$value->user_details->name;
            $MyObject->doucmentName =$value->doucmentName;
            $MyObject->created_at =$value->created_at;
            $from= Carbon::parse($value->dateOfWeek)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
            $to= Carbon::parse($value->dateOfWeek)->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
            $MyObject->startWeek =$from;
            $MyObject->endWeek =$to;
            $MyObjects[] = $MyObject;
        }
        return response()->json(['documents' => $MyObjects,'ids'=>$duplicateIds], 200);
    }
    public function getTimesheetsbyuserId(Request $request)
    {
        // return response()->json(['timesheets' => $request->get('date')], 200);
        $duplicateIds = DB::table("timesheetdocuments")
        ->selectRaw("min(documentId) as documentId")
        ->groupBy("dateOfWeek", "userId")
        ->havingRaw('count(documentId) > ?', [1])
        ->pluck("documentId");

        $getHours = 0;
        if ($request->userId) {

            $timesheet = TimeSheetDocuments::with('user_details')
              /*  ->when($request->get('date'), function ($query) use ($request) {
                    if ($request->get('date')) {
                        $query->whereYear('dateOfWeek', '=', \Carbon\Carbon::parse($request->get('date'))->format('Y'));
                        $query->whereMonth('dateOfWeek', '=', \Carbon\Carbon::parse($request->get('date'))->format('m'));
                    }
                }) */
                ->when($request->get('date1'), function ($query) use ($request) {
                    if ($request->get('date1')) {
                        if($request->get('date1')&&$request->get('date2'))
                        {
                            $start = \Carbon\Carbon::parse($request->get('date1'))->format('Y-m-d');
                            $end =  \Carbon\Carbon::parse($request->get('date2'))->format('Y-m-d');
                            $query->whereBetween('dateOfWeek',[$start,$end]);
                        }

                    }
                })
                ->whereNotIn("documentId", $duplicateIds)
                ->where('userId', '=', $request->userId)
                ->orderBy('dateOfWeek', 'DESC')
                ->get();

                $MyObjects = array();

                foreach($timesheet as $value)
                {
                $MyObject = new myObject;
                $MyObject->documentId =$value->documentId;
                $MyObject->dateOfWeek =$value->dateOfWeek;
                $MyObject->name=$value->user_details->name;
                $MyObject->doucmentName =$value->doucmentName;
                $MyObject->created_at =$value->created_at;
                $from= Carbon::parse($value->dateOfWeek)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
                $to= Carbon::parse($value->dateOfWeek)->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
                $MyObject->startWeek =$from;
                $MyObject->endWeek =$to;
                $MyObjects[] = $MyObject;
                }

               $getHours =   TimeSheet::select(DB::raw('sum(duration) as total'))
              /* ->when($request->get('date'), function ($query) use ($request) {
                if ($request->get('date')) {
                    $query->whereYear('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('Y'));
                    $query->whereMonth('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('m'));
                        }
                    }) */
                    ->when($request->get('date1'), function ($query) use ($request) {
                        if ($request->get('date1')) {
                            if($request->get('date1')&&$request->get('date2'))
                            {
                                $start = \Carbon\Carbon::parse($request->get('date1'))->format('Y-m-d');
                                $end =  \Carbon\Carbon::parse($request->get('date2'))->format('Y-m-d');
                                $query->whereBetween('fromDate',[$start,$end]);
                            }

                        }
                    })
               ->where('userId','=',$request->userId)
               ->first();

        } else {
                    $timesheet = TimeSheetDocuments::with('user_details')
                    ->whereNotIn("documentId", $duplicateIds)
                    ->orderBy('dateOfWeek', 'DESC')
                    ->get();


                    $MyObjects = array();

                    foreach($timesheet as $value)
                    {
                    $MyObject = new myObject;
                    $MyObject->documentId =$value->documentId;
                    $MyObject->dateOfWeek =$value->dateOfWeek;
                    $MyObject->name=$value->user_details->name;
                    $MyObject->doucmentName =$value->doucmentName;
                    $MyObject->created_at =$value->created_at;
                    $from= Carbon::parse($value->dateOfWeek)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
                    $to= Carbon::parse($value->dateOfWeek)->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
                    $MyObject->startWeek =$from;
                    $MyObject->endWeek =$to;
                    $MyObjects[] = $MyObject;
                    }
        }

        $currentUser = Auth::user();
        return response()->json(['documents' => $MyObjects,'getHours'=> $getHours->total, "user" => $currentUser], 200);
    }
}
