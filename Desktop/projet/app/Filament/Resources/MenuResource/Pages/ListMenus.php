<?php

namespace App\Filament\Resources\MenuResource\Pages;

use App\Filament\Resources\MenuResource;
use Filament\Resources\Pages\ListRecords;
use App\Filament\Traits\HasDescendingOrder;
use Filament\Pages\Actions;

class ListMenus extends ListRecords
{
    use HasDescendingOrder;

    protected static string $resource = MenuResource::class;
    protected function getActions(): array
    {
        return [
            Actions\CreateAction::make('new'),
        ];
    }
}
