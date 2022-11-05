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
class Submissions extends Model
{
    protected $table = 'vendors';
    protected $primaryKey = 'vendorId';
    protected $connection = 'reporting';
    protected $fillable = [
        'vendorName',
        'vendorMobileNumber',
        'vendorCompanyName',
        'vendorEmail',
        'endClientName',
        'actualRate',
        'submissionRate',
        'clientId',
        'vid',
        'vendorStatus',
        'userId',
        'timezone',
        'scheduleDate'
    ];

    public function user_details()
    {
        return $this->belongsTo(User::class, 'reportId');
    }

}
