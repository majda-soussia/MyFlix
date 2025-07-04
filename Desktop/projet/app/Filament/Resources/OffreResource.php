<?php

namespace App\Filament\Resources;

use App\Models\Offre;
use Filament\{Tables, Forms};
//use Filament\Resources\{Form, Table, Resource};
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Tables\Filters\SelectFilter;
use App\Filament\Filters\DateRangeFilter;
use App\Filament\Resources\OffreResource\Pages;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use filament\tables\table;
class OffreResource extends Resource
{
    protected static ?string $model = Offre::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-bag';
    

    protected static ?string $recordTitleAttribute = 'title';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Grid::make(['default' => 0])->schema([
                    TextInput::make('title')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Title')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    RichEditor::make('content')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Content')
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
                Tables\Columns\TextColumn::make('title')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('content')
                    ->toggleable()
                    ->searchable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('bonPlan.nom_bp')
                    ->toggleable()
                    ->limit(50),
            ])
            ->filters([
                DateRangeFilter::make('created_at'),

                SelectFilter::make('bon_plan_id')
                    ->relationship('bonPlan', 'nom_bp')
                    ->indicator('BonPlan')
                    ->multiple()
                    ->label('BonPlan'),
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
            'index' => Pages\ListOffres::route('/'),
            'create' => Pages\CreateOffre::route('/create'),
            'view' => Pages\ViewOffre::route('/{record}'),
            'edit' => Pages\EditOffre::route('/{record}/edit'),
        ];
    }
}
