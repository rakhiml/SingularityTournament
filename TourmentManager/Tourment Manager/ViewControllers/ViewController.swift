//
//  ViewController.swift
//  Tourment Manager
//
//  Created by Рахим Лугма on 22.06.2022.
//

import UIKit

class ViewController: UIViewController {
    
    @IBOutlet var signUpButton: UIButton!
    
    @IBOutlet var loginButton: UIButton!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        setUpElements()
    }
    
    func setUpElements() {
        
        Utilities.styleFilledButton(signUpButton)
        Utilities.styleHollowButton(loginButton)
    }
}

