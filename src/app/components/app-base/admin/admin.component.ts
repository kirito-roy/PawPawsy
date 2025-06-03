import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DataEntryService } from '../../core/api/data-entry.service';
import { firstValueFrom, tap } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [ReactiveFormsModule,CommonModule],
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  productForm: FormGroup;
  base64Image: string | null = null; // To store the Base64 image string
  imageError: string | null = null; // To store error messages for the image

  constructor(private formBuilder: FormBuilder,private apidata: DataEntryService) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productPrice: ['', [Validators.required, Validators.min(1)]],
      productDescription: ['', Validators.required],
      productCategory: ['', Validators.required],
      productImage: ['', Validators.required]
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Check file size (500 KB = 500 * 1024 bytes)
      if (file.size > 500 * 1024) {
        this.imageError = 'File size exceeds 500 KB. Please select a smaller file.';
        this.base64Image = null; // Reset the Base64 image
        console.error(this.imageError);
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string; // Convert the file to Base64
        this.imageError = null; // Clear any previous error
        console.log('Base64 Image:', this.base64Image);
      };

      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  }

  async onSubmit() {
    if (this.productForm.valid) {
      const formData = {
        ...this.productForm.value,
        productImage: this.base64Image // Include the Base64 image in the form data
      };
      console.log('Form Data:', formData);
      await firstValueFrom(this.apidata.SentData(formData).pipe(tap(
        (response) => {
          console.log('Data sent successfully:', response);
          // Handle success response here
        }
        , (error) => {
          console.error('Error sending data:', error);
          // Handle error response here
        }
      )));
      this.productForm.reset(); // Reset the form after submission
      this.base64Image = null; // Reset the Base64 image
      this.imageError = null; // Reset the image error
    }  else {
      console.log('Form is invalid');
    }
  }
}
