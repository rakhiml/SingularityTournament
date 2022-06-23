//
//  LoginViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
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

    func setUpElements() {
        
        errorLabel.alpha = 0
        
//        Utilities.styleTextField(loginTextField)
//        Utilities.styleTextField(passwordTextField)
        Utilities.styleFilledButton(loginButton)
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        let login = loginTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines)
        let password = passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines)
        
//        Auth.auth().signIn(withlogin: login, password: password) { (result, error) in
//
//            is error != nil {
//
//                self.errorLabel.text = error!.localizedDescription
//                self.errorLabel.alpha = 1
//
//            } else {
                
                let homeViewController = self.storyboard?.instantiateViewController(withIdentifier: Constants.Storyboard.homeViewController) as? MainViewController
                
                self.view.window?.rootViewController = homeViewController
                self.view.window?.makeKeyAndVisible()
//            }
//        }
    }
}
