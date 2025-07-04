<?php

namespace App\Filament\Resources\SousMenuResource\Pages;

use Filament\Resources\Pages\ListRecords;
use App\Filament\Traits\HasDescendingOrder;
use App\Filament\Resources\SousMenuResource;
use Filament\Pages\Actions;
class ListSousMenus extends ListRecords
{
    use HasDescendingOrder;

    protected static string $resource = SousMenuResource::class;
    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make('new'),
        ];
    }
}
