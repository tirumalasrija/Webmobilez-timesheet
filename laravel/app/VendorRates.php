<?php

/**
 * Created by Reliese Model.
 */

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;


class VendorRates extends Model
{
	protected $table = 'vendor_rates';
	protected $primaryKey = 'id';

	protected $fillable = [
		'rate','userId'
	];
    public function user_details()
    {
        return $this->belongsTo(User::class, 'userId');
    }

}
