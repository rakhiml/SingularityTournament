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
    
    @IBAction func signButtonTapped(_ sender: UIButton) {
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
    
}
