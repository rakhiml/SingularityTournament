//
//  LoginViewController.swift
//  Tourment Manager
//
//  Created by Рахим Лугма on 22.06.2022.
//

import UIKit

class LoginViewController: UIViewController {

    @IBOutlet var loginTextField: UITextField!
    
    @IBOutlet var passwordTextField: UITextField!
    
    @IBOutlet var loginButton: UIButton!
    
    @IBOutlet var errorLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        setUpElements()
    }

    @IBAction func loginButtonTapped(_ sender: Any) {
        
    }
    
    func setUpElements() {
        
        errorLabel.alpha = 0
        
//        Utilities.styleTextField(loginTextField)
//        Utilities.styleTextField(passwordTextField)
        Utilities.styleFilledButton(loginButton)
    }
}
