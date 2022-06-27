package kz.hackaton.tournament.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class UserFact {
    @Id
    @GeneratedValue
    private long id;
    private String fact;
    private String learnedMaterial;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private long id_of_feedbacker;
}
