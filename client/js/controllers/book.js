// add book controller - borrow a book, change status to unavailable
// all book controller - returns the list of all the books
// my book controller - returns a list of all the current books logged in user has borrowed

angular
  .module('app')
  .controller('AllBooksController', ['$scope', 'Book', function($scope,
    Book) {
    $scope.refreshBooks = Book.updateAll({
      where: {
        dueDate: {
          lt: new Date()
        }
      }
    }, {
      bStatus: 'available',
      dateBorrowed: null,
      dueDate: null,
      daysRemaining: null,
      clientId: null
    }, function(err, info) {});
    $scope.books = Book.find();
  }])
  .controller('AddBookController', ['$scope', 'Book',
    '$state',
    function($scope, Book, $state) {
      $scope.action = 'Borrow';
      $scope.books = [];
      $scope.selectedBook;
      $scope.isDisabled = false;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      var BORROW_LIMIT = 14 * DAY_IN_MILLISECONDS;

      Book.find({
          filter: {
            where: {
              bStatus: 'available'
            }
          }
        })
        .$promise
        .then(function(books) {
          $scope.books = books;
          $scope.selectedBook = $scope.selectedBook || books[0];
        });

      $scope.dueDate = new Date(Date.now() + BORROW_LIMIT);

      $scope.submitForm = function() {
        Book.updateAll({
          where: {
            bName: $scope.selectedBook.bName
          }
        }, {
          bStatus: 'unavailable',
          dateBorrowed: Date.now(),
          dueDate: Date.now() + BORROW_LIMIT,
          daysRemaining: 14,
          clientId: $scope.currentUser.id,
          renewalsAvailable: 2
        }, function(err, info) {
          $state.go('my-books');
        });
      };
    }
  ])
  .controller('RenewBookController', ['$scope', 'Book', 'Client',
    '$state',
    function($scope, Book, Client, $state) {
      $scope.action = 'Renew';
      $scope.books = [];
      $scope.selectedBook;
      $scope.isDisabled = false;
      var DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24;
      var BORROW_LIMIT = 14 * DAY_IN_MILLISECONDS;

      Client.books({
          id: $scope.currentUser.id,
          filter: {
            where: {
              renewalsAvailable: {
                gt: 0
              }
            }
          }
        })
        .$promise
        .then(function(books) {
          $scope.books = books;
          $scope.selectedBook = $scope.selectedBook || books[0];
        });;

      $scope.dueDate = new Date(Date.now() + BORROW_LIMIT);

      $scope.renewForm = function() {
        Book.updateAll({
          where: {
            bName: $scope.selectedBook.bName,
          }
        }, {
          bStatus: 'unavailable',
          dateBorrowed: Date.now(),
          dueDate: Date.now() + BORROW_LIMIT,
          daysRemaining: 14,
          clientId: $scope.currentUser.id,
          renewalsAvailable: $scope.selectedBook.renewalsAvailable - 1
        }, function(err, info) {
          $state.go('my-books');
        });
      };
    }
  ])
  .controller('MyBooksController', ['$scope', 'Client',
    function($scope, Client) {
      $scope.$watch('currentUser.id', function(value) {
        if (!value) {
          return;
        }
        $scope.clients = Client.books({
          id: $scope.currentUser.id
        });
      });
    }
  ]);
