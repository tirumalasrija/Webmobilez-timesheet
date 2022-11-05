<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class Faq extends Model
{
	protected $table = 'faqs';
	protected $primaryKey = 'id';

	protected $fillable = [
		'question','answer','userId'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
