//
//  TournamentTableViewCell.swift
//  TournamentManager1
//
//  Created by Aida Moldaly on 23.06.2022.
//

import UIKit


class TournamentTableViewCell: UITableViewCell {


    @IBOutlet var tounamentImageView: UIImageView!
    @IBOutlet var activeLabel: UILabel!
    @IBOutlet var nameLabel: UILabel!
    @IBOutlet var activeContainerView: UIView!
    
    override func awakeFromNib() {
        super.awakeFromNib()
        // Initialization code
    }
    
    func configure(with tournament: TournamentDetails) {
        tounamentImageView.image = UIImage(named: "\(tournament.type).jpeg")
        if (UIImage(named: "\(tournament.type).jpeg") == nil){
            tounamentImageView.image = UIImage(named: "defaultBanner.jpeg")
        }
        nameLabel.text = tournament.type
        
        activeContainerView.backgroundColor = .systemGreen
        activeLabel.text = "Active"


        
    }
    
    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
        // Configure the view for the selected state
    }
}
