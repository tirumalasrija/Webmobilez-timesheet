<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheet;
use Carbon\Carbon;
use Auth;
class TimeSheetController extends Controller
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

        $timesheet = TimeSheet::whereBetween('fromDate', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
        ->where('userId','=',Auth::user()->id)
        ->orderBy('fromDate', 'ASC')
        ->get();
        return response()->json(['timesheet' => $timesheet ], 200);
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'duration' => 'required',
            'date' => 'unique:employeetimesheet,fromDate,NULL,timeSheetId,userId,'.Auth::user()->id
        ]);
if($request->groupname =='leave' || $request->groupname =='holiday')
{
    $user = TimeSheet::create([
        'duration' => 0,
        'timeSheetType' => $request->groupname,
        'fromDate' => $request->date,
        'assignment' => $request->assignment,
        'userId' => Auth::user()->id,
        'serviceCode' => "Regular"
    ]);

}else{
    $user = TimeSheet::create([
        'duration' => $request->duration,
        'fromDate' => $request->date,
        'assignment' => $request->assignment,
        'userId' => Auth::user()->id,
        'serviceCode' => "Regular"
    ]);
}

        $from= Carbon::parse($request->date)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
        $to= Carbon::parse($request->date)->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
        $timesheet = TimeSheet::whereBetween('fromDate', [ $from,$to])
        ->where('userId','=',Auth::user()->id)
        ->orderBy('fromDate', 'ASC')
        ->get();
    return response()->json(['timesheet' => $timesheet,'user' => "TimeSheet Created Successfully" ], 200);

    }
    public function show($id)
    {
        //
       $from= Carbon::parse($id)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
       $to= Carbon::parse($id)->endOfWeek(Carbon::SATURDAY)->format('Y-m-d');
       $timesheet = TimeSheet::whereBetween('fromDate', [ $from,$to])
       ->where('userId','=',Auth::user()->id)
       ->orderBy('fromDate', 'ASC')
       ->get();

       $currentUser =Auth::user();
        return response()->json(['timesheet' =>$timesheet,"user"=>$currentUser], 200);
    }
 /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $user = TimeSheet::find($id);
        return response()->json(['user' => $user], 200);
    }
    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'duration' => 'required',
        //   'fromDate'    => 'required|unique:employeetimesheet,fromDate,'.$id.',timeSheetId,userId,'.Auth::user()->id
           //'fromDate'    => 'required|unique:employeetimesheet,fromDate,' . $id . ',id',
        ]);
        $result= TimeSheet::where('fromDate', '=', $request->fromDate)
        ->where('userId', '=', Auth::user()->id)
        ->where('timeSheetId', '!=', $id)
        ->get();

       if(empty(count($result))){


        $user = TimeSheet::find($id);
        //if($request->duration>0)
       // {
            $user->update([
                'duration' => $request->duration,
                'fromDate' => $request->fromDate,
                'timeSheetType' => 'work',
                'assignment' => $request->assignment,
                'serviceCode' => $request->serviceCode

            ]);
       // }

            return response()->json(['user' => $user,'message' => 'Timesheet Updated Successfully'], 200);

               }else{
                return response()->json(['message' => 'Date Field filed already Exist'], 400);

               }



    }


}
