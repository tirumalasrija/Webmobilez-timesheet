<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheet;
use Carbon\Carbon;
use Auth;
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

        $timesheet = TimeSheet::with('user_details')->orderBy('fromDate', 'ASC')
        ->get();
        return response()->json(['timesheet' => $timesheet ], 200);
    }
}
