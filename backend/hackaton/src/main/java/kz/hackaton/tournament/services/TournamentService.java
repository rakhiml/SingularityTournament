package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.CreateTournamentDto;
import kz.hackaton.tournament.entities.Tournament;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.repositories.TournamentRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final TournamentRepositories tournamentRepositories;
    private final UserService userService;

    @Transactional
    public void joinTourney(String name, Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("a"));
        User user = userService.findUserByLogin(name);
        tournament.getUsers().add(user);
        user.getTournaments().add(tournament);
    //    tournamentRepositories.save(tournament);


    }

    public void registerTourney(CreateTournamentDto createTournamentDto) {
        Tournament tournament = new Tournament();
        tournament.setName(createTournamentDto.getName());
        tournament.setType(createTournamentDto.getType());
        tournament.setCreatedDate(LocalDate.now());
        tournament.setStatus("registration");
        tournamentRepositories.save(tournament);
    }
}
