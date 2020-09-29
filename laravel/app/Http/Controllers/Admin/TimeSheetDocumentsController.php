<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\TimeSheetDocuments;
use Carbon\Carbon;
use Auth;
class TimeSheetDocumentsController extends Controller
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


        $timesheet = TimeSheetDocuments::where('userId','=',Auth::user()->id)->orderBy('fromDate', 'ASC')->get();

        $path ="https://employees.webmobilez.com/storage/app/uploads/employeedocument/";
        return response()->json(['timesheet' => $timesheet ,'path'=>$path], 200);
    }
    public function store(Request $request)
    {
       /* $this->validate($request, [
            'duration' => 'required'
        ]); */


        $otherDocumentpath ='';
        $from= Carbon::parse($request->dateOfWeek)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
        if ($request->hasFile('image')) {


            // Get filename with the extension
            $filenameWithExt = $request->file('image')->getClientOriginalName();
            //Get just filename
            $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
            // Get just ext
            $extension = $request->file('image')->getClientOriginalExtension();
            // Filename to store
            $otherDocumentpath = $filename . '_' . time() . '.' . $extension;
            // Upload Image
            $path =$request->file('image')->storeAs('uploads/employeedocument', $otherDocumentpath);
            $user = TimeSheetDocuments::create([
                'dateOfWeek' => $from,
                'doucmentName' => $otherDocumentpath,
                'userId' => Auth::user()->id
            ]);


        $from= Carbon::parse($from)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
         $documents = TimeSheetDocuments::where('dateOfWeek', '=',$from)
         ->where('userId','=',Auth::user()->id)
         ->orderBy('dateOfWeek', 'ASC')->get();
         $path ="https://employees.webmobilez.com/storage/app/uploads/employeedocument/";
        return response()->json(['documents' =>$documents,'path'=>$path], 200);

        }else{
            return response()->json(['user' =>"Error"], 400);
        }


    }
    public function show($id)
    {

       $from= Carbon::parse($id)->startOfWeek(Carbon::SUNDAY)->format('Y-m-d');
       $documents = TimeSheetDocuments::where('dateOfWeek', '=',$from)
       ->where('userId','=',Auth::user()->id)
       ->orderBy('dateOfWeek', 'ASC')
       ->take(2)
       ->get();
       $path ="https://employees.webmobilez.com/storage/app/uploads/employeedocument/";
        return response()->json(['documents' =>$documents,'path'=>$path], 200);
    }
    public function destroy($id)
    {
        $user = TimeSheetDocuments::find($id);
        $user->delete();
        return response()->json(['user' => $user,'message' => ' Deleted Successfully'], 200);
    }

}
