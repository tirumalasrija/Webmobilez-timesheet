<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\Model\Submissions;
use App\Model\Consultants;
use Auth;
use App\TimeSheet;
use App\UserDocuments;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
class ConsultantController extends Controller
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
        $user = Consultants::where('wStatus' , '=','S')->get();
        return response()->json(['user' => $user], 200);
    }








    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = Consultants::with('placed_details')->find($id);
        return response()->json(['user' => $user], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = Consultants::with('placed_details')->find($id);
        return response()->json(['user' => $user], 200);
    }






}
