$ () ->

	class App
		constructor: (el) ->
			@el = el
			@_events()

		_events: (value) ->
			@el.find('#initApp').on 'click', @_startApp

		_startApp: =>
			if @el.find('#valueOfApp').val() != ''
				@tables = $("#tables").empty().off().fadeIn(100)
				val = parseInt($('#valueOfApp').val())
				if _app then _app.destroy()
				else _app = new Alg(val, @tables).createTable()

	class Alg
		constructor: (value, container) ->
			@value = value
			@el = container
			@n = if value % 4 == 1 then value * 2 else value
			@el.html "<ul class='table-block table'></ul><ul class='table-block table-2'></ul>"

		_template: (i, P, Q, q) ->
			"<li>
				<div class='c1'>#{i}</div>
				<div class='c2'>#{P}</div>
				<div class='c3'>#{Q}</div>
				<div class='c4'>#{q}</div>
			</li>"

		_calcP: (i) ->
			if i == 0 then 0
			else @q[i-1] * @Q[i-1] - @P[i-1]

		_calcQ: (i) ->
			if i == 0 then 1
			else if i == 1 then @n - Math.pow(@q[0], 2)/@Q[i-1]
			else @Q[i-2] + @q[i-1] * (@P[i-1] - @P[i])

		_calcQNew: (i) ->
			if i == 1 then (@n - Math.pow(@P[i], 2))/@Q[0]
			else @Q[i-2] + @q[i-1] * (@P[i-1] - @P[i])

		_qFunc: (i) ->
			if i == 0 then Math.floor(Math.sqrt(@n))
			else Math.floor((@q[0] + @P[i])/@Q[i])

		_qFuncNew: (i) ->
			Math.floor((Math.sqrt(@n) + @P[i])/@Q[i])

		_exit: (i) ->
			result = false
			if i != 0 
				@fullSqr = Math.sqrt(@Q[i])
				if @fullSqr % 1 == 0 then result = true
			result

		_makeOdd: (value) ->
			while value % 2 == 0 then value = value/2
			value

		createTable: ->
			$table = @el.find('.table').empty().off()
			$table2 = @el.find('.table-2').empty().off()
			@P = []
			@Q = []
			@q = [] 
			@i = 0
			@_firstLoop(@i, $table)
			@_secondLoop(@i, $table2)
			@_writeResult()
			@

		_firstLoop: (i, $table) ->
			$table.append(@_template('i', 'P', 'Q', 'q'))
			loop
				@P[i] = @_calcP(i)
				@Q[i] = @_calcQ(i)
				@q[i] = @_qFunc(i)
				$table.append(@_template(i, @P[i], @Q[i], @q[i]))
				break if @_exit(i)
				i++
			@i = i

		_secondLoop: (i, $table2) ->
			$table2.append(@_template("i", "P'", "Q'", "q'"))
			@P[0] = -@P[i]
			@Q[0] = @fullSqr
			@q[0] = @_qFuncNew(0)
			$table2.append(@_template(0, @P[0], @Q[0], @q[0]))
			i = 1
			loop
				@P[i] = @_calcP(i)
				@Q[i] = @_calcQNew(i)
				@q[i] = @_qFuncNew(i)
				$table2.append(@_template(i, @P[i], @Q[i], @q[i]))
				break if @P[i] == @P[i-1]
				i++
			@divider = @_makeOdd(@Q[i-1])
			$table2.find('li').eq(i).addClass('divider')

		_writeResult: () ->
			@newDivider = @value/@divider
			$("#result").html "#{@value} = #{@divider} * #{@newDivider}"

	window.App = new App($('body'))
