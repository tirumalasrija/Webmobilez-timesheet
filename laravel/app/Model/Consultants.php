<?php

/**
 * Created by Reliese Model.
 */

namespace App\Model;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Jobs
 *
 * @property int $journalId
 * @property string $journalName
 * @property string $journalStatus
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @property Collection|JournalEventTaxConfig[] $journal_event_tax_configs
 *
 * @package App\Models
 */
class Consultants extends Model
{
    protected $table = 'reports';
    protected $primaryKey = 'reportId';
    protected $connection = 'reporting';
    protected $fillable = [

		'consultatName',
		'consultatMobileNumber',
		'technology',
		'otherTechnologies',
		'rate',
		'experience',
		'visaType',
		'city',
		'state',
		'willingLocation',	'userStatus',
		'comments','workauthorization','resume','otherDocument',
		'reportStatus','userId'
    ];
    public function placed_details()
    {
        return $this->belongsTo(Submissions::class, 'reportId');
    }


}
