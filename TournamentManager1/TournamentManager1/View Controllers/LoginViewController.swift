//
//  LoginViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit

class LoginViewController: UIViewController {

    private let networkManager: NetworkManagerAF = .shared
    
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
        Utilities.styleFilledButton(loginButton)
    }
    
    @IBAction func loginButtonTapped(_ sender: Any) {
        guard let username = loginTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
        guard let password = passwordTextField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
        
        
        let login = PersonLogin(login: username, password: password)
        
        networkManager.postLogin(credentials: login) { [weak self] result in
            guard let self = self else { return }
            switch result {
            case let .success(message):
                // some toastview to show that user is registered
                let homeViewController = self.storyboard?.instantiateViewController(withIdentifier: "MainViewController") as? MainViewController
                
                self.navigationController?.pushViewController(homeViewController!, animated: true)
                self.view.window?.makeKeyAndVisible()
                print("123")
            case let .failure(error):
                print("456")
            }
            
        }
    }
}
