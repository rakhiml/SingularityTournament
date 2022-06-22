//
//  SignUpViewController.swift
//  Tourment Manager
//
//  Created by Рахим Лугма on 22.06.2022.
//

import UIKit

class SignUpViewController: UIViewController {

    
    @IBOutlet var loginTextField: UITextField!
    
    @IBOutlet var firstNameTextField: UITextField!
    
    @IBOutlet var lastNameTextField: UITextField!
    
    @IBOutlet var majorPickerView: UIPickerView!
    
    @IBOutlet var passwordTextField: UITextField!
    
    @IBOutlet var checkPasswordTextField: UITextField!
    
    @IBOutlet var signUpButton: UIButton!
    
    @IBOutlet var errorLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        setUpElements()
    }
    
    func setUpElements() {
        
        errorLabel.alpha = 0
        
//        Utilities.styleTextField(loginTextField)
//        Utilities.styleTextField(firstNameTextField)
//        Utilities.styleTextField(lastNameTextField)
//        Utilities.styleTextField(passwordTextField)
//        Utilities.styleTextField(checkPasswordTextField)
        Utilities.styleFilledButton(signUpButton)
    }
    
    func validateField() -> String? {
        
        if loginTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            firstNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            lastNameTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" ||
            checkPasswordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) == "" {
            return "Please fill in all fields."
        }
        
        let cleanedPassword = passwordTextField.text!.trimmingCharacters(in: .whitespacesAndNewlines)
        
        if Utilities.isPasswordValid(cleanedPassword) == false {
            return ""
        }
        
        return nil
    }
    
    @IBAction func signButtonTapped(_ sender: UIButton) {
        
    }
    
    
    
}
