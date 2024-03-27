<?php

namespace App\Filament\Resources\OffreResource\Pages;

use Filament\Resources\Pages\ListRecords;
use App\Filament\Resources\OffreResource;
use App\Filament\Traits\HasDescendingOrder;
use Filament\Pages\Actions;

class ListOffres extends ListRecords
{
    use HasDescendingOrder;

    protected static string $resource = OffreResource::class;
    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make('new'),
        ];
    }
}
