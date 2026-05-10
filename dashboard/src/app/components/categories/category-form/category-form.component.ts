import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { Category, CategoryService } from '../../../services/category.service';

@Component({
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
],
  selector: 'app-category-form',

  providers: [MatSnackBar],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit' : 'Add' }} Category</h2>
    <mat-dialog-content>
      <form [formGroup]="form">
        <!-- Category Name -->
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Name</mat-label>
          <input matInput formControlName="name" placeholder="Category name" />
          @if (form.get('name')?.hasError('required')) {
            <mat-error
              >Name is required</mat-error
              >
            }
          </mat-form-field>
    
          <div class="file-upload-container">
            <label for="categoryImage">Category Image</label>
            <input
              type="file"
              id="categoryImage"
              (change)="onFileSelected($event)"
              accept="image/*"
              />
              @if (!isEdit && !selectedFile) {
                <p class="image-error">
                  Image is required for new categories
                </p>
              }
            </div>
    
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea
                matInput
                formControlName="description"
                rows="3"
                placeholder="Optional description"
              ></textarea>
            </mat-form-field>
          </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Cancel</button>
          <button
            mat-raised-button
            color="primary"
            (click)="submit()"
            [disabled]="form.invalid || loading || (!isEdit && !selectedFile)"
            >
            {{ loading ? 'Saving...' : isEdit ? 'Update' : 'Create' }}
          </button>
        </mat-dialog-actions>
    `,
  styles: [
    `
      .full-width {
        width: 100%;
        margin-bottom: 8px;
      }
      mat-dialog-content {
        padding-top: 16px !important;
      }
      .file-upload-container {
        margin-bottom: 16px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      .image-error {
        color: #f44336;
        font-size: 12px;
      }
    `,
  ],
})
export class CategoryFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  isEdit = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category | null,
  ) {}

  ngOnInit() {
    this.isEdit = !!this.data;
    this.form = this.fb.group({
      name: [this.data?.name || '', Validators.required],
      description: [this.data?.description || ''],
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.loading = true;

    const formData = new FormData();
    formData.append('name', this.form.get('name')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.form.get('description')?.value) {
      formData.append('description', this.form.get('description')?.value);
    }

    const request = this.isEdit
      ? this.categoryService.update(this.data!._id!, formData)
      : this.categoryService.create(formData);

    request.subscribe({
      next: () => {
        this.snackBar.open(
          `Category ${this.isEdit ? 'updated' : 'created'}!`,
          'Close',
          { duration: 3000 },
        );
        this.dialogRef.close(true);
      },
      error: (err: any) => {
        this.snackBar.open(
          err?.error?.message || 'Something went wrong',
          'Close',
          { duration: 3000 },
        );
        this.loading = false;
      },
    });
  }
}
