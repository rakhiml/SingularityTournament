package kz.hackaton.tournament.services;

import kz.hackaton.tournament.dto.CreateTournamentDto;
import kz.hackaton.tournament.entities.Match;
import kz.hackaton.tournament.entities.Round;
import kz.hackaton.tournament.entities.Tournament;
import kz.hackaton.tournament.entities.User;
import kz.hackaton.tournament.repositories.TournamentRepositories;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TournamentService {

    private final TournamentRepositories tournamentRepositories;
    private final UserService userService;
    private final RoundService roundService;

    private final MatchService matchService;

    @Transactional
    public void joinTourney(String name, Long id) {
        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("a"));
        User user = userService.findUserByLogin(name);
        tournament.getUsers().add(user);
       // user.getTournaments().add(tournament);



    }

    @Transactional
    public void registerTourney(CreateTournamentDto createTournamentDto, String name) {
        Tournament tournament = new Tournament();
        tournament.setName(createTournamentDto.getName());
        tournament.setType(createTournamentDto.getType());
        tournament.setCreatedDate(LocalDate.now());
        tournament.setStatus("registration");
        User owner = userService.findUserByLogin(name);
        tournament.setOwner(owner.getId());
        tournamentRepositories.save(tournament);
    }

    @Transactional
    public void startTourney(Long id, String login) {
        User userByLogin = userService.findUserByLogin(login);
        if(!userByLogin.getLogin().equals(login)) {
            System.out.println("ERORRRRRR");
            return;
        }

        Tournament tournament = tournamentRepositories.findById(id).orElseThrow(() -> new RuntimeException("EROR"));
        Collection<User> users = tournament.getUsers();
        int usersCount = users.size() - 1;
        int days = (usersCount / 5) * 2 + usersCount;
        tournament.setStatus("started");
        tournament.setStartedDate(LocalDate.now());
        tournament.setFinishedDate(tournament.getStartedDate().plusDays(days));
        List<Round> roundList = generateRound(tournament);

        tournament.setRoundList(roundList);

    }

    public List<Round> generateRound(Tournament tournament) {
        List<User> users = (List<User>) tournament.getUsers();
        Collections.shuffle(users);
        List<Round> roundList = new ArrayList<>();
        for (int i = 0; i < users.size() - 1; i++) {
             Round round = new Round();
             round.setStage(i+1);

            List<Match> matchList = new ArrayList<>();
            for (int j = 0; j < users.size()/2; j++) {
                Match match = new Match();
                match.setUser1(users.get(j).getId());
                match.setUser2(users.get(j+users.size()/2).getId());
                matchService.save(match);
                matchList.add(match);

            }

            round.setMatchList(matchList);
            roundService.save(round);
            roundList.add(round);

            shuffleAlg(users);
        }
        return roundList;
    }


    public List<User> shuffleAlg(List<User> list) {
        User temp = list.get(list.size()-1);
        for (int i = list.size()-1; i > 1; i--) {
            if(i == 2) {
                list.set(i,temp);
                break;
            }
            list.set(i,list.get(i-1));
        }
        return list;
    }
}
