<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class TimeSheetDocuments extends Model
{
	protected $table = 'timesheetdocuments';
	protected $primaryKey = 'documentId';

	protected $fillable = [
		'doucmentName','dateOfWeek','userId'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
