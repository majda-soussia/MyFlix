<?php

namespace App\Filament\Resources\BonPlanResource\Pages;

use Filament\Resources\Pages\ListRecords;
use App\Filament\Traits\HasDescendingOrder;
use App\Filament\Resources\BonPlanResource;
use Filament\Pages\Actions;


class ListBonPlans extends ListRecords
{
    use HasDescendingOrder;

    protected static string $resource = BonPlanResource::class;
    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make('new'),
        ];
    }
}
