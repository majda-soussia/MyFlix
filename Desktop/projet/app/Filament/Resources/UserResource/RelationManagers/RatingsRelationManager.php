<?php

namespace App\Filament\Resources\UserResource\RelationManagers;

use Filament\Forms;
use Filament\Tables;
//use Filament\Resources\{Form, Table};
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Illuminate\Database\Eloquent\Builder;
use Filament\Forms\Components\BelongsToSelect;
use Filament\Tables\Filters\MultiSelectFilter;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use filament\tables\table;
class RatingsRelationManager extends RelationManager
{
    protected static string $relationship = 'ratings';

    protected static ?string $recordTitleAttribute = 'comment_bp';

    public  function form(Form $form): Form
    {
        return $form->schema([
            Grid::make(['default' => 0])->schema([
                TextInput::make('rate_bp')
                    ->rules(['numeric'])
                    ->numeric()
                    ->placeholder('Rate Bp')
                    ->columnSpan([
                        'default' => 12,
                        'md' => 12,
                        'lg' => 12,
                    ]),

                TextInput::make('comment_bp')
                    ->rules(['max:255', 'string'])
                    ->placeholder('Comment Bp')
                    ->columnSpan([
                        'default' => 12,
                        'md' => 12,
                        'lg' => 12,
                    ]),

                Select::make('bon_plan_id')
                    ->rules(['exists:bon_plans,id'])
                    ->relationship('bonPlan', 'nom_bp')
                    ->searchable()
                    ->placeholder('Bon Plan')
                    ->columnSpan([
                        'default' => 12,
                        'md' => 12,
                        'lg' => 12,
                    ]),
            ]),
        ]);
    }

    public  function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('rate_bp'),
                Tables\Columns\TextColumn::make('comment_bp')->limit(50),
                Tables\Columns\TextColumn::make('user.name')->limit(50),
                Tables\Columns\TextColumn::make('bonPlan.nom_bp')->limit(50),
            ])
            ->filters([
                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from'),
                        Forms\Components\DatePicker::make('created_until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn(
                                    Builder $query,
                                    $date
                                ): Builder => $query->whereDate(
                                    'created_at',
                                    '>=',
                                    $date
                                )
                            )
                            ->when(
                                $data['created_until'],
                                fn(
                                    Builder $query,
                                    $date
                                ): Builder => $query->whereDate(
                                    'created_at',
                                    '<=',
                                    $date
                                )
                            );
                    }),

                MultiSelectFilter::make('user_id')->relationship(
                    'user',
                    'name'
                ),

                MultiSelectFilter::make('bon_plan_id')->relationship(
                    'bonPlan',
                    'nom_bp'
                ),
            ])
            ->headerActions([Tables\Actions\CreateAction::make()])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([Tables\Actions\DeleteBulkAction::make()]);
    }
}
