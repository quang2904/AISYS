import sys
from PyQt6.QtCore import pyqtSignal, QObject
from PyQt6.QtWidgets import QApplication, QWidget, QVBoxLayout, QPushButton, QStackedWidget

from pages.Login.login import LoginScreen
from pages.Register.register import RegisterScreen
from pages.App.app import AppScreen

class ViewSignals(QObject):
    """A class to define a signal for switching views"""
    switch_view = pyqtSignal(int)  # Signal to switch views

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()

        self.signals = ViewSignals()  # Create signal object
        self.signals.switch_view.connect(self.change_view)

        self.stacked_widget = QStackedWidget()
        self.view1 = LoginScreen(self.signals)
        self.view2 = RegisterScreen(self.signals)
        self.view3 = AppScreen(self.signals)

        self.stacked_widget.addWidget(self.view1)
        self.stacked_widget.addWidget(self.view2)
        self.stacked_widget.addWidget(self.view3)

        layout = QVBoxLayout()
        layout.addWidget(self.stacked_widget)
        self.setLayout(layout)

        self.setWindowTitle("Test Chatbot")
        self.resize(1500, 800)

    def change_view(self, index):
        """Slot to update view based on the emitted signal"""
        self.stacked_widget.setCurrentIndex(index)

if __name__ == "__main__":
    app = QApplication(sys.argv)
    main_window = MainWindow()
    main_window.show()
    sys.exit(app.exec())