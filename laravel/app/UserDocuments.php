<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class UserDocuments extends Model
{
	protected $table = 'userdocuments';
	protected $primaryKey = 'userDocumentId';

	protected $fillable = [
		'documentType','documentFile','userId'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
