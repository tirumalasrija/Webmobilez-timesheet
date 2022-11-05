<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class Invoices extends Model
{

	protected $table = 'invoices';
	protected $primaryKey = 'invoiceId';

	protected $fillable = [
		'invoiceStatus','date','services','hours','rate','printName','amount','signature','invoiceNumber','userId','signature'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
