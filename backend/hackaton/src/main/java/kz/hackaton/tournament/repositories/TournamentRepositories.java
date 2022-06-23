package kz.hackaton.tournament.repositories;

import kz.hackaton.tournament.entities.Tournament;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TournamentRepositories extends JpaRepository<Tournament, Long> {
    List<Tournament> findByStatus(String status);

}
