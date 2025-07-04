<?php

namespace App\Filament\Resources;

use App\Models\BonPlan;
use Filament\{Tables, Forms};
//use Filament\Resources\{Form, Table, Resource};
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Card;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Tables\Filters\SelectFilter;
use App\Filament\Filters\DateRangeFilter;
use App\Filament\Resources\BonPlanResource\Pages;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use filament\tables\table;
class BonPlanResource extends Resource 
{
    protected static ?string $model = BonPlan::class;

    protected static ?string $navigationIcon = 'heroicon-o-shopping-cart';
    
    protected static ?string $recordTitleAttribute = 'nom_bp';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Card::make()->schema([
                Grid::make(['default' => 0])->schema([
                    TextInput::make('nom_bp')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Nom Bp')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('categorie_bp')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Categorie Bp')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('tel_bp')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Tel Bp')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('desc_bp')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Desc Bp')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('location')
                        ->rules(['max:255', 'string'])
                        ->required()
                        ->placeholder('Location')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    Select::make('user_id')
                        ->rules(['exists:users,id'])
                        ->required()
                        ->relationship('user', 'name')
                        ->searchable()
                        ->placeholder('User')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('ouverture')
                        ->rules(['max:255', 'string'])
                       // ->required()
                        ->placeholder('Ouverture')
                        ->columnSpan([
                            'default' => 12,
                            'md' => 12,
                            'lg' => 12,
                        ]),

                    TextInput::make('fermuture')
                        ->rules(['max:255', 'string'])
                        //->required()
                        ->placeholder('Fermuture')
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
                Tables\Columns\TextColumn::make('nom_bp')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('categorie_bp')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('tel_bp')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('desc_bp')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('location')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('user.name')
                    ->toggleable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('ouverture')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
                Tables\Columns\TextColumn::make('fermuture')
                    ->toggleable()
                    ->searchable(true, null, true)
                    ->limit(50),
            ])
            ->filters([
                DateRangeFilter::make('created_at'),

                SelectFilter::make('user_id')
                    ->relationship('user', 'name')
                    ->indicator('User')
                    ->multiple()
                    ->label('User'),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            BonPlanResource\RelationManagers\OffresRelationManager::class,
            BonPlanResource\RelationManagers\RatingsRelationManager::class,
            BonPlanResource\RelationManagers\MenusRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListBonPlans::route('/'),
            'create' => Pages\CreateBonPlan::route('/create'),
            'view' => Pages\ViewBonPlan::route('/{record}'),
            'edit' => Pages\EditBonPlan::route('/{record}/edit'),
        ];
    }
}
