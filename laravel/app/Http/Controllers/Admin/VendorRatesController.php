<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\VendorRates;
use Carbon\Carbon;
use Auth;
class VendorRatesController extends Controller
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
        $faqs='';
        if(Auth::user()->role=='Admin')
        {
            $faqs = VendorRates::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }

        return response()->json(['userrates' => $faqs ], 200);
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'rate' => 'required',
           'userId' => 'required|unique:vendor_rates'
        ]);

        if(Auth::user()->role=='Admin')
        {
        $user = VendorRates::create([
            'rate' => $request->rate,
            'userId' =>$request->userId,
            'created_at' => Carbon::now()
        ]);


            $faqs = VendorRates::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();

        }
        return response()->json(['userrates' => $faqs,'message' => "User Rate Created Successfully"], 200);
    }
    public function show($id)
    {

        if(Auth::user()->role=='Admin')
        {
        $faq = VendorRates::with('user_details')->find($id);


        return response()->json(['userrate' =>$faq], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        if(Auth::user()->role=='Admin')
        {
        $faq = VendorRates::with('user_details')->find($id);


        return response()->json(['userrate' =>$faq], 200);
        }
    }
    public function update(Request $request, $id)
    {
        if(Auth::user()->role=='Admin')
        {
        $user    = VendorRates::find($id);
        if($request->rate)
        $user->rate  = $request->rate;
        $user->save();
    return response()->json(['userrate' => $user,'message' => 'User Rate  Updated Successfully'], 200);
        }
    }

    public function destroy($id)
    {
        if(Auth::user()->role=='Admin')
        {
        $user = VendorRates::find($id);
        $user->delete();
        $userrates='';
        if(Auth::user()->role=='Admin')
        {
            $userrates = VendorRates::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }

     //   $timesheet = Payments::where('userId','=',Auth::user()->id)

        return response()->json(['userrates' => $userrates ], 200);
    }
    }
}
