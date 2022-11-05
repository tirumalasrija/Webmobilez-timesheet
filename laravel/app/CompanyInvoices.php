<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class CompanyInvoices extends Model
{

	protected $table = 'admininvoices';
	protected $primaryKey = 'id';

	protected $fillable = [
		'userId','clientName','invoiceNumber','invoiceDate','paymentDuedate','suppliersName','suppliersAddress','description','quantity','rate','amount','name'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
