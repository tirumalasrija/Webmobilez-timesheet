<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Payments;
use Carbon\Carbon;
use Auth;
class PaymentsController extends Controller
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
        $timesheet='';
        if(Auth::user()->role=='Admin')
        {
            $timesheet = Payments::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }
        if(Auth::user()->role=='User' || Auth::user()->role=='UserW' )
        {
            $timesheet = Payments::with('user_details')
            ->where('userId','=',Auth::user()->id)
            ->where('type','=','D')
            ->orderBy('created_at', 'DESC')
            ->get();
        }
     //   $timesheet = Payments::where('userId','=',Auth::user()->id)

        return response()->json(['timesheet' => $timesheet ], 200);
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'amount' => 'required',
         //   'date' => 'unique:employeetimesheet,fromDate,NULL,timeSheetId,userId,'.Auth::user()->id
        ]);

        $fromdate=Carbon::parse($request->rangeDates[0])->toDateTimeString();
        $toDate=Carbon::parse($request->rangeDates[1])->toDateTimeString();
        $user = Payments::create([
            'amount' => $request->amount,
            'hours' => $request->hours,
            'transferDate' => $request->transferDate,
            'confirmationNumber' => $request->confirmationNumber,
            'userId' => $request->userId,
            'paymentStatus' => $request->paymentStatus,
            'fromDate' => $fromdate,
            'toDate' => $toDate,
            'type' =>$request->type,
            'created_at' => Carbon::now()
        ]);

        return response()->json(['user' => "Payment Created Successfully"], 200);
    }
    public function show($id)
    {
        //
        $user = Payments::with('user_details')->find($id);

       $currentUser =Auth::user();
        return response()->json(['payment' =>$user,"user"=>$currentUser], 200);
    }
    public function getpaymentbyuserId(Request $request)
    {

        $user = Payments::with('user_details')
        ->where('userId','=',$request->userId)
        ->get();

       $currentUser =Auth::user();
        return response()->json(['payments' => $user,"user"=>$currentUser], 200);
    }
 /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $user = Payments::find($id);
        return response()->json(['payment' => $user], 200);
    }
    public function update(Request $request, $id)
    {
        if($request->rangeDates)
        $fromdate=Carbon::parse($request->rangeDates[0])->addDay(1)->toDateTimeString();
        if($request->rangeDates)
        $toDate=Carbon::parse($request->rangeDates[1])->addDay(1)->toDateTimeString();
        $user            = Payments::find($id);
        if($request->amount)
        $user->amount  = $request->amount;
        if($request->rangeDates)
        $user->fromDate  = $fromdate;
        if($request->rangeDates)
        $user->toDate  =  $toDate;
        if($request->hours)
        $user->hours  = $request->hours;
        if($request->transferDate)
        $user->transferDate  = $request->transferDate;
        if($request->confirmationNumber)
        $user->confirmationNumber  = $request->confirmationNumber;
        if($request->userId)
        $user->userId  = $request->userId;
        if($request->type)
        $user->type  = $request->type;
        if($request->paymentStatus)
        $user->paymentStatus  = $request->paymentStatus;
        $user->save();
    return response()->json(['payment' => $user,'message' => 'payment Updated Successfully'], 200);
    }


}
