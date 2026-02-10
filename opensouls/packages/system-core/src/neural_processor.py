import torch
import torch.nn as nn
import torch.nn.functional as F
from typing import Optional, Tuple, List

class NeuralProcessor(nn.Module):
    """
    Advanced neural processing unit for handling multi-modal input streams
    with attention mechanisms and dynamic context windows.
    """
    def __init__(self, input_dim: int = 512, hidden_dim: int = 1024, num_layers: int = 6):
        super().__init__()
        self.input_dim = input_dim
        self.hidden_dim = hidden_dim
        self.num_layers = num_layers
        
        self.embedding = nn.Linear(input_dim, hidden_dim)
        self.positional_encoding = self._create_positional_encoding(hidden_dim)
        
        encoder_layer = nn.TransformerEncoderLayer(d_model=hidden_dim, nhead=8)
        self.transformer_encoder = nn.TransformerEncoder(encoder_layer, num_layers=num_layers)
        
        self.output_head = nn.Linear(hidden_dim, input_dim)
        self.dropout = nn.Dropout(0.1)

    def _create_positional_encoding(self, dim: int, max_len: int = 5000) -> torch.Tensor:
        pe = torch.zeros(max_len, dim)
        position = torch.arange(0, max_len, dtype=torch.float).unsqueeze(1)
        div_term = torch.exp(torch.arange(0, dim, 2).float() * (-torch.log(torch.tensor(10000.0)) / dim))
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        return pe.unsqueeze(0)

    def forward(self, x: torch.Tensor, mask: Optional[torch.Tensor] = None) -> torch.Tensor:
        """
        Forward pass through the neural processor.
        
        Args:
            x: Input tensor of shape (batch_size, seq_len, input_dim)
            mask: Optional attention mask
            
        Returns:
            Processed tensor of shape (batch_size, seq_len, input_dim)
        """
        x = self.embedding(x) * torch.sqrt(torch.tensor(self.hidden_dim))
        x = x + self.positional_encoding[:, :x.size(1), :].to(x.device)
        x = self.dropout(x)
        
        x = x.permute(1, 0, 2)  # Transformer expects (seq_len, batch_size, dim)
        output = self.transformer_encoder(x, src_key_padding_mask=mask)
        output = output.permute(1, 0, 2)  # Back to (batch_size, seq_len, dim)
        
        return self.output_head(output)

class ContextManager:
    """
    Manages dynamic context windows for long-running sessions.
    """
    def __init__(self, max_context_length: int = 8192):
        self.max_context_length = max_context_length
        self.context_buffer: List[torch.Tensor] = []
        
    def push_context(self, embedding: torch.Tensor):
        self.context_buffer.append(embedding)
        if len(self.context_buffer) > self.max_context_length:
            self.context_buffer.pop(0) # FIFO eviction policy
            
    def get_context_tensor(self) -> torch.Tensor:
        if not self.context_buffer:
            return torch.empty(0)
        return torch.stack(self.context_buffer)
