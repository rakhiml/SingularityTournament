//
//  AddTournamentViewController.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit

protocol AddTournamentDelegate: AnyObject {
    func addTournament(tournament: TournamentDetails)
}

class AddTournamentViewController: UIViewController {
    
    private let networkManager: NetworkManagerAF = .shared
    
    weak var addDelegate: AddTournamentDelegate?
    
    private let tournamentPickerView = UIPickerView()
    
    private var chooseTournament: String = ""
    
    private let tournaments: [String] = ["MortalCombat", "Fifa", "Tenis","UFC"]
    
    var cellIndex: Int?
    
    // MARK: - UITextField
    
    let tournamentNameField: UITextField = {
        let textField = UITextField()
        textField.textAlignment = .center
        textField.translatesAutoresizingMaskIntoConstraints = false
        textField.placeholder = "Enter tournament name"
        return textField
    }()
    
    let descriptionField: UITextField = {
        let textField = UITextField()
        textField.textAlignment = .center
        textField.placeholder = "Enter tournament description"
        textField.translatesAutoresizingMaskIntoConstraints = false
        return textField
    }()
    
    
    // MARK: - Save UIButton
    let saveButton: UIButton = {
        let button = UIButton()
        button.backgroundColor = .systemBlue
        button.setTitle("Save", for: .normal)
        button.translatesAutoresizingMaskIntoConstraints = false
        button.addTarget(self, action: #selector(saveButtonTapped), for: .touchUpInside)
        return button
    }()

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = .white
        view.addSubview(tournamentNameField)
        view.addSubview(descriptionField)
        view.addSubview(saveButton)
        view.addSubview(tournamentPickerView)
        
        tournamentPickerView.delegate = self
        tournamentPickerView.dataSource = self
        chooseTournament = tournaments[0]
        
        setUpConstraints()
    }
    
    @objc private func saveButtonTapped() {

        guard let tournamentName = tournamentNameField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
        guard let description = descriptionField.text?.trimmingCharacters(in: .whitespacesAndNewlines) else { return }
        
//        let tournament = TournamentDetails(id: 0, type: tournamentName, status: chooseTournament, description: description, participants: 1)
        let tourToSend = TournamentDto(name: tournamentName, type: chooseTournament, description: description)
//        addDelegate?.addTournament(tournament: tournament)
        
            networkManager.postTournaments(credentials: tourToSend) { [weak self] result in
                guard self != nil else { return }
                switch result {
                case let .success(message):
                    // some toastview to show that user is registered
                    print(message?.description)
                    print("Pushed new tournament")
                    print("123")
                case let .failure(error):
                    print(error.localizedDescription)
                    
                }
            }
        if let MainViewController = navigationController?.viewControllers
                                                                .filter(
                                              {$0 is MainViewController})
                                                                .first {
            navigationController?.popToViewController(MainViewController, animated: true)
        }
    }

    // MARK: - Setup Constraints
    
    func setUpConstraints() {
        tournamentNameField.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor, constant: 25).isActive = true
        tournamentNameField.leadingAnchor.constraint(equalTo: view.leadingAnchor, constant: 20).isActive = true
        tournamentNameField.trailingAnchor.constraint(equalTo: view.trailingAnchor, constant: -20).isActive = true
        tournamentNameField.heightAnchor.constraint(equalToConstant: view.frame.height * 0.05).isActive = true
        tournamentNameField.layer.borderWidth = 2
        tournamentNameField.layer.cornerRadius = 5
        tournamentNameField.layer.borderColor = UIColor.systemGray5.cgColor
        
        descriptionField.topAnchor.constraint(equalTo: tournamentNameField.bottomAnchor, constant: 10).isActive = true
        descriptionField.leadingAnchor.constraint(equalTo: tournamentNameField.leadingAnchor).isActive = true
        descriptionField.trailingAnchor.constraint(equalTo: tournamentNameField.trailingAnchor).isActive = true
        descriptionField.heightAnchor.constraint(equalToConstant: view.frame.height * 0.05).isActive = true
        descriptionField.layer.borderWidth = 2
        descriptionField.layer.cornerRadius = 5
        descriptionField.layer.borderColor = UIColor.systemGray5.cgColor
        
        tournamentPickerView.translatesAutoresizingMaskIntoConstraints = false
        tournamentPickerView.topAnchor.constraint(equalTo: descriptionField.bottomAnchor, constant: 50).isActive = true
        tournamentPickerView.leadingAnchor.constraint(equalTo: tournamentNameField.leadingAnchor).isActive = true
        tournamentPickerView.trailingAnchor.constraint(equalTo: tournamentNameField.trailingAnchor).isActive = true
        tournamentPickerView.heightAnchor.constraint(equalToConstant: 100).isActive = true
        tournamentPickerView.transform = CGAffineTransform(scaleX: 1, y: 1);
        
        
        saveButton.leadingAnchor.constraint(equalTo: tournamentNameField.leadingAnchor).isActive = true
        saveButton.trailingAnchor.constraint(equalTo: tournamentNameField.trailingAnchor).isActive = true
        saveButton.heightAnchor.constraint(equalToConstant:50).isActive = true
        saveButton.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor, constant: -10).isActive = true
        Utilities.styleFilledButton(saveButton)
        
    }
}

extension AddTournamentViewController: UIPickerViewDelegate, UIPickerViewDataSource {
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        tournaments.count
    }
    
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        let row = tournaments[row]
        return row
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        chooseTournament = tournaments[row]
    }
}


