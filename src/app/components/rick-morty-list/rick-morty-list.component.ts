import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickMortyService } from '../../services/rick-morty.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-rick-morty-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressBarModule,
    MatCardModule
  ],
  templateUrl: './rick-morty-list.component.html',
  styleUrls: ['./rick-morty-list.component.scss']
})
export class RickMortyListComponent implements OnInit {
  allCharacters: any[] = [];
  groupedCharacters: {[key: string]: any[]} = {};
  characterGroups: any[] = [];
  isLoading = true;
  searchTerm = '';

  constructor(private rickMortyService: RickMortyService) { }

  ngOnInit(): void {
    this.loadAllCharacters();
  }

  loadAllCharacters(): void {
    this.rickMortyService.getAllCharacters().subscribe({
      next: (characters) => {
        this.allCharacters = characters;
        this.groupCharacters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading characters', err);
        this.isLoading = false;
      }
    });
  }

  groupCharacters(): void {
    this.groupedCharacters = {};
    
    const charactersToGroup = this.searchTerm 
      ? this.allCharacters.filter(c => 
          c.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : this.allCharacters;
    
    charactersToGroup.forEach(character => {
      const baseName = character.name.split(' ')[0];
      if (!this.groupedCharacters[baseName]) {
        this.groupedCharacters[baseName] = [];
      }
      this.groupedCharacters[baseName].push(character);
    });
    
    this.characterGroups = Object.entries(this.groupedCharacters)
      .map(([name, characters]) => ({ name, characters }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  onSearch(): void {
    this.groupCharacters();
  }

  trackByCharacterId(index: number, character: any): number {
    return character.id;
  }
}