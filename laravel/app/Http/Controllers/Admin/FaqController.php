<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Faq;
use Carbon\Carbon;
use Auth;
class FaqController extends Controller
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
            $faqs = Faq::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }
        if(Auth::user()->role!='Admin')
        {
            $faqs = Faq::with('user_details')
           // ->where('userId','=',Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();
        }
     //   $timesheet = Payments::where('userId','=',Auth::user()->id)

        return response()->json(['faqs' => $faqs ], 200);
    }
    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
         //   'date' => 'unique:employeetimesheet,fromDate,NULL,timeSheetId,userId,'.Auth::user()->id
        ]);
        $answer ='';
       if($request->answer)
        $answer = $request->answer;
        $user = Faq::create([
            'question' => $request->name,
            'answer' =>$answer,
            'userId' =>Auth::user()->id,
            'created_at' => Carbon::now()
        ]);
        $faqs='';
        if(Auth::user()->role=='Admin')
        {
            $faqs = Faq::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }
        if(Auth::user()->role!='Admin')
        {
            $faqs = Faq::with('user_details')
            //->where('userId','=',Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();
        }
        return response()->json(['faqs' => $faqs,'message' => "Faq Created Successfully"], 200);
    }
    public function show($id)
    {
        //
        $faq = Faq::with('user_details')->find($id);

       $currentUser =Auth::user();
        return response()->json(['faq' =>$faq,"user"=>$currentUser], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {

        $user = Faq::find($id);
        return response()->json(['payment' => $user], 200);
    }
    public function update(Request $request, $id)
    {

        $user    = Faq::find($id);
        if($request->name)
        $user->question  = $request->name;
        if($request->answer)
        $user->answer  = $request->answer;
        $user->save();
    return response()->json(['faq' => $user,'message' => 'Faq Updated Successfully'], 200);
    }

    public function destroy($id)
    {
        $user = Faq::find($id);
        $user->delete();
        $faqs='';
        if(Auth::user()->role=='Admin')
        {
            $faqs = Faq::with('user_details')
            ->orderBy('created_at', 'DESC')
            ->get();
        }
        if(Auth::user()->role!='Admin')
        {
            $faqs = Faq::with('user_details')
           // ->where('userId','=',Auth::user()->id)
            ->orderBy('created_at', 'DESC')
            ->get();
        }
     //   $timesheet = Payments::where('userId','=',Auth::user()->id)

        return response()->json(['faqs' => $faqs ], 200);
    }
}
