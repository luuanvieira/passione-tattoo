import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    onSubmit() {
        if (this.username && this.password) {
            this.isLoading = true;
            this.authService.login(this.username, this.password).subscribe({
                next: (response) => {
                    const token = response.access_token || response.token;
                    if (token) {
                        this.authService.setToken(token);
                        this.router.navigate(['/status']);
                    } else {
                        alert('Token não encontrado na resposta da API');
                    }
                    this.isLoading = false;
                },
                error: (error) => {
                    console.error('Erro no login:', error);
                    this.isLoading = false;
                    if (error.status === 401) {
                        alert('Credenciais inválidas');
                    } else {
                        alert('Erro ao fazer login. Tente novamente.');
                    }
                }
            });
        } else {
            alert('Por favor, preencha todos os campos');
        }
    }

    manterConectado: string = "";
    username: string = "";
    password: string = "";
    isLoading: boolean = false;
}
