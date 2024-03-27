<?php

namespace App\Filament\Resources;
use App\Models\Rating;

//use Filament\Resources\{Form, Table, Resource};

use Filament\Forms\Components\Fieldset;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
//use Filament\Forms\Components\TextInput;
use filament\tables\table;
use App\Models\SousMenu;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Filters\SelectFilter;
use App\Filament\Filters\DateRangeFilter;
use App\Filament\Resources\SousMenuResource\Pages;
use Filament\Forms\Form;
use Filament\{Tables, Forms};
use Filament\Resources\Resource;
class SousMenuResource extends Resource
{
    protected static ?string $model = SousMenu::class;

   // protected static ?string $navigationIcon = 'heroicon-o-collection';
      protected static ?string $navigationIcon = 'heroicon-o-document-text';

    protected static ?string $recordTitleAttribute = 'nom';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Grid::make(['default' => 0])->schema([
                    TextInput::make('nom')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Nom')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('prix')
                        ->rules(['numeric'])
                        ->required()
                        ->numeric()
                        ->placeholder('Prix')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    Select::make('menu_id')
                        ->rules(['exists:menus,id'])
                        ->required()
                        ->relationship('menu', 'nom')
                        ->searchable()
                        ->placeholder('Menu')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),
                        
                    Select::make('bon_plan_id')
                    ->rules(['exists:bon_plans,id'])
                    ->required()
                    ->relationship('bonPlan', 'nom_bp')
                    ->searchable()
                    ->placeholder('Bon Plan')
                    ->columnSpan([
                        'default' => 12,
                        'md' => 12,
                        'lg' => 12,
                    ]),
                ]),
            ]),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->poll('60s')
            ->columns([
                Tables\Columns\TextColumn::make('nom')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('prix')
                    ->toggleable()
                    ->searchable(true, null, true),
                Tables\Columns\TextColumn::make('menu.nom')
                    ->toggleable()
                    ->limit(50),
                    Tables\Columns\TextColumn::make('bonPlan.nom_bp')
                    ->toggleable()
                    ->limit(50),
            ])
            ->filters([
                DateRangeFilter::make('created_at'),

                SelectFilter::make('menu_id')
                    ->relationship('menu', 'nom')
                    ->indicator('Menu')
                    ->multiple()
                    ->label('Menu'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSousMenus::route('/'),
            'create' => Pages\CreateSousMenu::route('/create'),
            'view' => Pages\ViewSousMenu::route('/{record}'),
            'edit' => Pages\EditSousMenu::route('/{record}/edit'),
        ];
    }
}
