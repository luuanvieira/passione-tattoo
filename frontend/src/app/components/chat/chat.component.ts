import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnDestroy, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChatService } from '../../services/chat.service';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {

  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;

  messages: Message[] = [];
  newMessage: string = '';
  messageId: number = 1;
  isTyping: boolean = false;
  isOnline: boolean = true;

  private shouldScrollToBottom = false;

  constructor(private chatService: ChatService) {
  }

  ngOnInit() {
    this.chatService.resetSession();
    this.clearChat();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
  }

  sendMessage() {
    if (this.newMessage.trim() && this.newMessage.length <= 500) {
      const userMessage = this.newMessage.trim();
      this.messages.push({
        id: this.messageId++,
        text: userMessage,
        isUser: true,
        timestamp: new Date(),
        status: 'sending'
      });

      this.newMessage = '';
      this.shouldScrollToBottom = true;

      setTimeout(() => {
        const lastMessage = this.messages[this.messages.length - 1];
        if (lastMessage) {
          lastMessage.status = 'sent';
        }
      }, 500);

      this.isTyping = true;

      this.chatService.sendMessage(userMessage).subscribe({
        next: (response) => {
          this.isTyping = false;
          this.addBotResponse(response.message);
        },
        error: (error) => {
          console.error('Erro ao enviar mensagem:', error);
          this.isTyping = false;
          this.addBotResponse('Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.');
        }
      });

      setTimeout(() => {
        this.messageInput.nativeElement.focus();
      }, 100);
    }
  }

  onInputChange() {

  }

  trackByMessageId(index: number, message: Message): number {
    return message.id;
  }

  getMessageClasses(isUser: boolean): string {
    const baseClasses = 'px-4 py-3 rounded-2xl max-w-xs md:max-w-sm lg:max-w-md break-words shadow-md';
    return isUser
      ? `${baseClasses} bg-brand text-white rounded-br-md ml-auto`
      : `${baseClasses} bg-[#2c2c2e] text-gray-100 rounded-bl-md border border-white/5`;
  }

  getButtonClasses(): string {
    const baseClasses = 'send-button flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-200';
    const enabledClasses = 'bg-brand hover:bg-brand-dark text-white cursor-pointer shadow-[0_0_20px_rgba(210,62,142,0.45)]';
    const disabledClasses = 'bg-white/10 text-gray-500 cursor-not-allowed';

    return `${baseClasses} ${this.newMessage.trim() ? enabledClasses : disabledClasses}`;
  }

  private addBotResponse(botMessage: string) {
    this.messages.push({
      id: this.messageId++,
      text: botMessage,
      isUser: false,
      timestamp: new Date(),
      status: 'delivered'
    });

    this.shouldScrollToBottom = true;
  }

  private scrollToBottom(): void {
    try {
      if (this.messagesContainer) {
        const element = this.messagesContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    } catch (err) {
      console.error('Erro ao fazer scroll:', err);
    }
  }

  clearChat() {
    this.messages = [];
    this.messageId = 1;
  }

  exportChat() {
    if (this.messages.length === 0) {
      return;
    }

    const chatText = this.messages.map(msg =>
      `[${msg.timestamp.toLocaleTimeString()}] ${msg.isUser ? 'Usuário' : 'Sistema'}: ${msg.text}`
    ).join('\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
