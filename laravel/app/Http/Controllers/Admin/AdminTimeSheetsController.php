<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheet;
use App\Model\Submissions;
use App\Model\Consultants;
use App\User;
use Carbon\Carbon;
use Auth;
use Illuminate\Support\Facades\DB;
class AdminTimeSheetsController extends Controller
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
        //

        $timesheet = TimeSheet::with('user_details')->orderBy('fromDate', 'DESC')
            ->get();
        return response()->json(['timesheet' => $timesheet], 200);
    }
    public function dataList()
    {
        //
        if (Auth::user()->role == 'Admin') {
            $user = User::where('role', '!=', 'Admin')->where('userStatus', '=', 'A')->get();

            return response()->json(['user' => $user], 200);
        } else {
            return response()->json(['user' => '', 'schedules' => ''], 200);
        }
    }
    public function getTimesheetsbyuserId(Request $request)
    {
        // return response()->json(['timesheets' => $request->get('date')], 200);
        $getHours = 0;
        if ($request->userId) {

            $timesheet = TimeSheet::with('user_details')
                ->when($request->get('date1'), function ($query) use ($request) {
                    if ($request->get('date1')) {
                        if($request->get('date1')&&$request->get('date2'))
                        {
                            $start = \Carbon\Carbon::parse($request->get('date1'))->format('Y-m-d');
                            $end =  \Carbon\Carbon::parse($request->get('date2'))->format('Y-m-d');
                            $query->whereBetween('fromDate',[$start,$end]);
                        }

                     //   $query->whereYear('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('Y'));
                      //  $query->whereMonth('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('m'));
                    }
                })

                ->where('userId', '=', $request->userId)
                ->orderBy('fromDate', 'DESC')
                ->get();

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

                         //   $query->whereYear('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('Y'));
                          //  $query->whereMonth('fromDate', '=', \Carbon\Carbon::parse($request->get('date'))->format('m'));
                        }
                    })
               ->where('userId','=',$request->userId)
               ->first();

        } else {
            $timesheet = TimeSheet::with('user_details')

                ->orderBy('fromDate', 'DESC')
                ->get();
        }

        $currentUser = Auth::user();
        return response()->json(['timesheets' => $timesheet,'getHours'=> $getHours->total, "user" => $currentUser], 200);
    }
}
