<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheetDocuments;
use Carbon\Carbon;
use Auth;
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
        //

        $timesheet = TimeSheetDocuments::with('user_details')->orderBy('dateOfWeek', 'ASC')
        ->get();
        return response()->json(['documents' => $timesheet ], 200);
    }
}
