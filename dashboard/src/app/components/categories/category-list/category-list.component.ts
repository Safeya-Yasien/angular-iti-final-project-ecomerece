import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit {
  categories: any[] = [];
  isLoading = false;
  displayedColumns = ['name', 'actions'];

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    this.categoryService.getCategories().subscribe({
      next: (res: any) => {
        this.categories = res.data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Error fetching categories:', err);
        this.isLoading = false;
      },
    });
  }

  openForm(category?: any) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '500px',
      data: category || null,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadCategories();
    });
  }

  deleteCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Category deleted!', 'Close', { duration: 3000 });
          this.loadCategories();
        },
        error: (err: any) => {
          this.snackBar.open('Delete failed', 'Close', { duration: 3000 });
        },
      });
    }
  }
}
