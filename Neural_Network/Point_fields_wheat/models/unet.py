import torch
import torch.nn as nn

class UNet(nn.Module):
    def __init__(self):
        super().__init__()
        # Encoder
        self.enc1 = self._block(1, 64)
        self.pool1 = nn.MaxPool2d(2)
        # Decoder
        self.up1 = nn.ConvTranspose2d(64, 1, kernel_size=2, stride=2)
        self.final = nn.Sigmoid()  # Маска [0, 1]

    def _block(self, in_channels, out_channels):
        return nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, padding=1),
            nn.ReLU(),
            nn.Conv2d(out_channels, out_channels, 3, padding=1),
            nn.ReLU()
        )

    def forward(self, x):
        x = self.enc1(x)
        x = self.pool1(x)
        x = self.up1(x)
        return self.final(x)