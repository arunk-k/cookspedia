import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {

  // base_url: string = "http://localhost:3214/"
  base_url: string = "https://recipeserver-gq8f.onrender.com/"

  getHeader() {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${sessionStorage.getItem('token')}`
    }
    return header
  }

  constructor(private http: HttpClient) { }

  recipeListApi() {
    return this.http.get(`${this.base_url}allrecipes`)
  }

  userListApi() {
    return this.http.get(`${this.base_url}userlist`, { headers: this.getHeader() })
  }

  getDownloadApi() {
    return this.http.get(`${this.base_url}getDownloadList`, { headers: this.getHeader() })
  }

  getDownloadList() {
    return this.http.get(`${this.base_url}getDownloadlist`, { headers: this.getHeader() })
  }

  getTestimonyRequestsApi() {
    return this.http.get(`${this.base_url}getrequests`, { headers: this.getHeader() })
  }

  updateRequestApi(id: any, data: any) {
    return this.http.patch(`${this.base_url}updaterequest/${id}`, data, { headers: this.getHeader() })
  }

  addRecipeApi(data: any) {
    return this.http.post(`${this.base_url}addrecipe`, data, { headers: this.getHeader() })
  }

  deleteRecipeApi(id: any) {
    return this.http.delete(`${this.base_url}deleterecipe/${id}`, { headers: this.getHeader() })
  }

  updateRecipeApi(id: any, data: any) {
    return this.http.put(`${this.base_url}updaterecipe/${id}`, data, { headers: this.getHeader() })
  }
}

