<?php

namespace App\Filament\Resources\RatingResource\Pages;

use Filament\Resources\Pages\ListRecords;
use App\Filament\Resources\RatingResource;
use App\Filament\Traits\HasDescendingOrder;
use Filament\Pages\Actions;

class ListRatings extends ListRecords
{
    use HasDescendingOrder;

    protected static string $resource = RatingResource::class;
    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make('new'),
        ];
    }
}
